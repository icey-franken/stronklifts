const jwt = require("jsonwebtoken");

const {
  jwtConfig: { secret, expiresIn },
} = require("../../config");
const { User } = require("../../db/models");

class AuthenticationError extends Error {
  constructor() {
    super("Unauthorized");

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = "AuthenticationError";
    this.status = 401;
  }
}

function generateToken(user) {
  const data = user.toSafeObject();

  return jwt.sign({ data }, secret, {
    expiresIn: Number.parseInt(expiresIn)
  });
}

function restoreUser(req, _res, next) {
  const { token } = req.cookies;
  if (!token) {
    const err = new AuthenticationError();
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      const err = new AuthenticationError();
      return next(err);
    }

    const userId = payload.data.id;

    try {
      req.user = await User.getCurrentUserById(userId);
    } catch (e) {
      const err = new AuthenticationError();
      return next(err);
    }

    next();
  });
}

function getCurrentUser(req, _res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next();
  }
  return jwt.verify(token, secret, null, async (err, payload) => {
    if (!err) {
      const userId = payload.data.id;
      req.user = await User.getCurrentUserById(userId);
    }
    return next();
  });
}

const requireUser = [restoreUser];

module.exports = { generateToken, requireUser, getCurrentUser, AuthenticationError };
