
// Middleware function to check if user is logged in
const withAuth = async (req, res, next) => {
    console.log(req.session.logged_in)
    
    // If user is not logged in, redirect to login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // Authorization successful, continue processing the protected request
      next();
    }
};

  // Exporting withAuth middleware function
  module.exports = withAuth;