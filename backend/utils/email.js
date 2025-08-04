const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send password reset email
const sendResetPasswordEmail = async (email, resetUrl) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"StoryLoom" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request - StoryLoom',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">StoryLoom</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            You requested a password reset for your StoryLoom account. Click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #ff6b35, #f7931e); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block; 
                      font-weight: bold;
                      font-size: 16px;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          
          <p style="background: #e9ecef; padding: 15px; border-radius: 5px; word-break: break-all; color: #495057;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This link will expire in 10 minutes for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            Best regards,<br>
            The StoryLoom Team
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Email could not be sent');
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, username) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"StoryLoom" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to StoryLoom!',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to StoryLoom!</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your journey begins here</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${username}!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Welcome to StoryLoom! We're excited to have you join our community of writers and readers.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Here's what you can do with your new account:
          </p>
          
          <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <li>Create and publish your own blog posts</li>
            <li>Connect with other writers and readers</li>
            <li>Like and comment on posts</li>
            <li>Explore different categories and topics</li>
            <li>Build your personal brand as a writer</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/home" 
               style="background: linear-gradient(135deg, #ff6b35, #f7931e); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block; 
                      font-weight: bold;
                      font-size: 16px;">
              Start Writing
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions or need help getting started, feel free to reach out to our support team.
          </p>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            Happy writing!<br>
            The StoryLoom Team
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error for welcome email as it's not critical
  }
};

module.exports = {
  sendResetPasswordEmail,
  sendWelcomeEmail
}; 