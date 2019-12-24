<?php

	//error_reporting( E_ALL );

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require './PHPMailer/Exception.php';
	require './PHPMailer/PHPMailer.php';
	require './PHPMailer/SMTP.php'; 
	
	$data = json_decode($_POST["data"]);

	$text = $_POST['text'];

	$mail = new PHPMailer;

	//Enable SMTP debugging.
	$mail->SMTPDebug = 3;
	//Set PHPMailer to use SMTP.
	$mail->isSMTP();
	//Set SMTP host name
	$mail->Host = "mail.glicksheds.com";
	//Set this to true if SMTP host requires authentication to send email
	$mail->SMTPAuth = true;
	//Provide username and password
	$mail->Username = "noreply@glicksheds.com";
	$mail->Password = "%P_$(?#I8!Ro";
	//If SMTP requires TLS encryption then set it
	$mail->SMTPSecure = "ssl";
	//Set TCP port to connect to 
	$mail->Port = 465;

	$mail->From = "noreply@glicksheds.com";
	$mail->FromName = "Glick Sheds";

//	$mail->addAddress("sales@glicksheds.com", "Glick Sheds");
	$mail->addAddress("devin@webtek.cc", "Glick Sheds");

	$mail->isHTML(true);

	$mail->Subject = "Glick Sheds Shed Visualizer";
	
	$mail->Body = $text;

	$count = 1;

/* Looping all of the images to attach them to the email */ 

	foreach($data as $imgurl){
		echo "http://shedvisualizer.webtekdevelopment.com/".$imgurl." ";
		$imgurl2 = "http://shedvisualizer.webtekdevelopment.com/".$imgurl;
		$mail->addStringAttachment(file_get_contents($imgurl2), 'shed-photo'.$count.'.jpeg');
		$count++;
	}
	
	$mail->send();

/* This script is to clear out the images folder once the images are attached to the email */ 

		echo "Message has been sent successfully";
		// Folder path to be flushed 
		$folder_path = "../shed-design-center/images"; 
   
		// List of name of files inside 
		// specified folder 
		$files = glob($folder_path.'/*');  
   
		// Deleting all the files in the list 
		foreach($files as $file) { 
   
    	if(is_file($file))  
    
        // Delete the given file 
        unlink($file);  
			} 

/* THANK YOU */
	/*$mail->clearAllRecipients();
	
	$mail->addAddress("support@webtek.cc", "test thanks");
	
	$mail->Subject = "SMTP Test Time But You're Getting A Thank You :D";
	$mail->Body = $text; */

	/* if(!$mail->send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	}
*/


/* Old Email Stuff without SMTP and attachments
$name = $_POST['name'];
$email = $_POST['toEmail'];
$phone = $_POST['phone'];
$text = $_POST['text'];
$message = stripslashes($_POST['message']);

// to attach the images to email you'd need to decode the base64 in here, then render it as attachments to the email.
		$all_message = $text;
		$to = "tara@webtek.cc";
		//$to = "[Client's Email]";
		$from = "glickshed1@".gethostname();
		$businessname = "Glick Sheds";
		$subject = " Glick Sheds - Shed Visualizer";
		$mailheaders = "From: Glick Sheds <$from> \n";
		$mailheaders .= "Reply-To: $email \r\n";
		$mailheaders .= "Content-Type: text/html \r\n";
		$mailheaders2 = "From: $name <$from> \n";
		$mailheaders2 .= "Reply-To: $to \r\n";
		$mailheaders2 .= "Content-Type: text/html \r\n";
		mail($email, $subject, $all_message2, $mailheaders2);
		$result = mail($to, $subject, $all_message, $mailheaders);

*/

?>