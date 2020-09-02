const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: 'xxx'
  }
}));

exports.getLogin = (req, res, next) => {
  let error = req.flash('error');

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: error.length > 0 ? error[0] : null
  });
};

exports.getSignup = (req, res, next) => {
  let error = req.flash('error');
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: error.length > 0 ? error[0] : null
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email and/or password');
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email and/or password');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({
    email: email
  })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email already exists, please login with existing account.');
        return res.redirect('/login');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
              item: []
            }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');

          return transporter.sendMail({
            to: 'jasonj85@gmail.com',
            from: 'jasonj85@gmail.com',
            subject: 'Signup successful!',
            html: '<h2>Congratulations you are now a member of the best website in the world'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let error = req.flash('error');

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: error.length > 0 ? error[0] : null
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'Account does not exist, please check the email entered.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();

      })
      .then(result => {
        req.flash('error', 'A reset password link has been sent to your email, please check your emails and confirm.');
        res.redirect('/login');

        transporter.sendMail({
          to: 'jasonj85@gmail.com', //req.body.email
          from: 'jasonj85@gmail.com',
          subject: 'Please reset your password.',
          html: `<h2>You requested a password reset</h2><br>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password.</p>`
        });
      })
      .catch(err => {
        console.log(err);
      });
  })
};

exports.getNewPassword = (req, res, next) => {
  let error = req.flash('error');

  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: error.length > 0 ? error[0] : null,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  let error = req.flash('error');

  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
  .then(user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then(hashedPassword => {
    resetUser.password = hashedPassword;
    resetUser.resetToken = null;
    resetUser.resetTokenExpiration = undefined;
    return resetUser.save(); 
  })
  .then(result => {
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
  })
}