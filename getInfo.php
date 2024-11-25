<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);

    $to = "krojan321@gmail.com"; // Replace with the recipient's email address
    $subject = "New Form Submission";
    $message = "Name: " . $name . "\nEmail: " . $email . "\nPhone: " . $phone . "\nAddress: " . $address;
    $headers = "From: webmaster@example.com"; // Replace with the sender's email address

    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Form submitted successfully!</h2>";
    } else {
        echo "<h2>There was an error submitting the form. Please try again.</h2>";
    }
}
?>
