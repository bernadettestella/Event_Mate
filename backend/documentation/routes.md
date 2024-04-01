Method: GET
Description: Return the home page's payload.
Returns: The home page's payload.

/register
Methods: POST, GET
Description: Register a new user. The user type can be either usher or planner.
Parameters:
username (string, required): The username of the new user.
password (string, required): The password of the new user.
usertype (string, required): The type of the new user (usher or planner).
email (string, required): The email of the new user.
Returns: The data of the registered user.

/login
Methods: POST, GET
Description: Log in an existing user. The user type can be either usher or planner.
Parameters:
username (string, required): The username of the user.
password (string, required): The password of the user.
usertype (string, required): The type of the user (usher or planner).
session_id (string, optional): The session ID of the user.
Returns: The data of the logged-in user.

/users/<user_type>
Methods: GET
Description: Return the list of users of a specific type.
Parameters:
user_type (string, required): The type of users to return (usher or planner).
Returns: The list of users.

/user/<user_type>/<user_id>
Methods: GET
Description: Return the user with the given type and ID.
Parameters:
user_type (string, required): The type of the user (usher or planner).
user_id (string, required): The ID of the user.
Returns: The data of the user.

/forgot-password
Methods: POST, GET
Description: Send a password reset token to the email of the user.
Parameters:
email (string, required): The email of the user.
Returns: The reset token.

/reset-password/<token>
Methods: POST, GET
Description: Reset the password of the user with the given token.
Parameters:
email (string, required): The email of the user.
new_password (string, required): The new password of the user.
Returns: A status message indicating whether the password was reset successfully.

/postjob
Methods: GET, POST
Description: Post a new job.
Parameters:
description (string, required): The description of the job.
payment_amount (string, required): The payment amount for the job.
Returns: The ID of the new job.

/hire/<usher_id>/<job_id>
Methods: GET
Description: Hire an usher for a job.
Parameters:
usher_id (string, required): The ID of the usher.
job_id (string, required): The ID of the job.
Returns: The status of the hiring request.

/update/<user_type>/<user_id>/<update_param>
Methods: POST
Description: Update the specified parameter of the user with the given type and ID.
Parameters:
user_type (string, required): The type of the user (usher or planner).
user_id (string, required): The ID of the user.
update_param (string, required): The name of the parameter to update.
Returns: The status of the update request.

/logout
Methods: GET, POST
Description: Log out the current user.
Returns: None.