<?php
/*
UserSpice 4
An Open Source PHP User Management System
by the UserSpice Team at http://UserSpice.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
?>
<?php require_once 'init.php'; ?>
<?php require_once $abs_us_root.$us_url_root.'users/includes/header.php'; ?>
<?php require_once $abs_us_root.$us_url_root.'users/includes/navigation.php'; ?>

<?php if (!securePage($_SERVER['PHP_SELF'])){die();} ?>
<?php
// To make this panel super admin only, uncomment out the lines below
// if($user->data()->id !='1'){
//   Redirect::to('account.php');
// }

//PHP Goes Here!
delete_user_online(); //Deletes sessions older than 24 hours

//Find users who have logged in in X amount of time.
$date = date("Y-m-d H:i:s");

$hour = date("Y-m-d H:i:s", strtotime("-1 hour", strtotime($date)));
$today = date("Y-m-d H:i:s", strtotime("-1 day", strtotime($date)));
$week = date("Y-m-d H:i:s", strtotime("-1 week", strtotime($date)));
$month = date("Y-m-d H:i:s", strtotime("-1 month", strtotime($date)));

$last24=time()-86400;

$recentUsersQ = $db->query("SELECT * FROM users_online WHERE timestamp > ? ORDER BY timestamp DESC",array($last24));
$recentUsersCount = $recentUsersQ->count();
$recentUsers = $recentUsersQ->results();

$usersHourQ = $db->query("SELECT * FROM users WHERE last_login > ?",array($hour));
$usersHour = $usersHourQ->results();
$hourCount = $usersHourQ->count();

$usersTodayQ = $db->query("SELECT * FROM users WHERE last_login > ?",array($today));
$dayCount = $usersTodayQ->count();
$usersDay = $usersTodayQ->results();

$usersWeekQ = $db->query("SELECT username FROM users WHERE last_login > ?",array($week));
$weekCount = $usersWeekQ->count();

$usersMonthQ = $db->query("SELECT username FROM users WHERE last_login > ?",array($month));
$monthCount = $usersMonthQ->count();

$usersQ = $db->query("SELECT * FROM users");
$user_count = $usersQ->count();

$pagesQ = $db->query("SELECT * FROM pages");
$page_count = $pagesQ->count();

$levelsQ = $db->query("SELECT * FROM permissions");
$level_count = $levelsQ->count();

$settingsQ = $db->query("SELECT * FROM settings");
$settings = $settingsQ->first();

if(!empty($_POST['settings'])){
	$token = $_POST['csrf'];
	if(!Token::check($token)){
		die('Token doesn\'t match!');
	}

	if($settings->recaptcha != $_POST['recaptcha']) {
		$recaptcha = Input::get('recaptcha');
		$fields=array('recaptcha'=>$recaptcha);
		$db->update('settings',1,$fields);
	}
	if($settings->site_name != $_POST['site_name']) {
		$site_name = Input::get('site_name');
		$fields=array('site_name'=>$site_name);
		$db->update('settings',1,$fields);
	}
	if($settings->login_type != $_POST['login_type']) {
		$login_type = Input::get('login_type');
		$fields=array('login_type'=>$login_type);
		$db->update('settings',1,$fields);
	}
	if($settings->force_ssl != $_POST['force_ssl']) {
		$force_ssl = Input::get('force_ssl');
		$fields=array('force_ssl'=>$force_ssl);
		$db->update('settings',1,$fields);
	}
	if($settings->force_pr != $_POST['force_pr']) {
		$force_pr = Input::get('force_pr');
		$fields=array('force_pr'=>$force_pr);
		$db->update('settings',1,$fields);
	}
	if($settings->site_offline != $_POST['site_offline']) {
		$site_offline = Input::get('site_offline');
		$fields=array('site_offline'=>$site_offline);
		$db->update('settings',1,$fields);
	}
	if($settings->track_guest != $_POST['track_guest']) {
		$track_guest = Input::get('track_guest');
		$fields=array('track_guest'=>$track_guest);
		$db->update('settings',1,$fields);
	}

	Redirect::to('admin.php');
}

if(!empty($_POST['css'])){
	if($settings->css_sample != $_POST['css_sample']) {
		$css_sample = Input::get('css_sample');
		$fields=array('css_sample'=>$css_sample);
		$db->update('settings',1,$fields);
	}

	if($settings->us_css1 != $_POST['us_css1']) {
		$us_css1 = Input::get('us_css1');
		$fields=array('us_css1'=>$us_css1);
		$db->update('settings',1,$fields);
	}
	if($settings->us_css2 != $_POST['us_css2']) {
		$us_css2 = Input::get('us_css2');
		$fields=array('us_css2'=>$us_css2);
		$db->update('settings',1,$fields);
	}

	if($settings->us_css3 != $_POST['us_css3']) {
		$us_css3 = Input::get('us_css3');
		$fields=array('us_css3'=>$us_css3);
		$db->update('settings',1,$fields);
	}
	Redirect::to('admin.php');
}

?>
<div id="page-wrapper"> <!-- leave in place for full-screen backgrounds etc -->
<div class="container"> <!-- -fluid -->

<h1 class="text-center">Beam Admin Dashboard</h1>

<div class="row"> <!-- row for Users, Permissions, Pages, Email settings panels -->
	<h2>Admin Panels</h2>
	<!-- Users Panel -->
	<div class="col-xs-6 col-md-3">
	<div class="panel panel-default">
	<div class="panel-heading"><strong>Users</strong></div>
	<div class="panel-body text-center"><div class="huge"> <i class='fa fa-user fa-1x'></i> <?=$user_count?></div></div>
	<div class="panel-footer">
	<span class="pull-left"><a href="admin_users.php">Manage</a></span>
	<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	<div class="clearfix"></div>
	</div> <!-- /panel-footer -->
	</div><!-- /panel -->
	</div><!-- /col -->

	<!-- Permissions Panel -->
	<div class="col-xs-6 col-md-3">
	<div class="panel panel-default">
	<div class="panel-heading"><strong>Permission Levels</strong></div>
	<div class="panel-body text-center"><div class="huge"> <i class='fa fa-lock fa-1x'></i> <?=$level_count?></div></div>
	<div class="panel-footer">
	<span class="pull-left"><a href="admin_permissions.php">Manage</a></span>
	<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	<div class="clearfix"></div>
	</div> <!-- /panel-footer -->
	</div><!-- /panel -->
	</div> <!-- /.col -->

	<!-- Pages Panel -->
	<div class="col-xs-6 col-md-3">
	<div class="panel panel-default">
	<div class="panel-heading"><strong>Pages</strong></div>
	<div class="panel-body  text-center"><div class="huge"> <i class='fa fa-file-text fa-1x'></i> <?=$page_count?></div></div>
	<div class="panel-footer">
	<span class="pull-left"><a href="admin_pages.php">Manage</a></span>
	<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
	<div class="clearfix"></div>
	</div> <!-- /panel-footer -->
	</div><!-- /panel -->
	</div><!-- /col -->

	<!-- Email Settings Panel -->
	<div class="col-xs-6 col-md-3">
	<div class="panel panel-default">
	<div class="panel-heading"><strong>Email Settings</strong></div>
	<div class="panel-body text-center"><div class="huge"> <i class='fa fa-paper-plane fa-1x'></i> </div></div>
	<div class="panel-footer">
	<span class="pull-left"><a href='email_settings.php'>Manage</a></span>
	<span class="pull-right"><i class='fa fa-arrow-circle-right'></i></span>
	<div class="clearfix"></div>
	</div> <!-- /panel-footer -->
	</div> <!-- /panel -->
	</div> <!-- /col -->

</div> <!-- /.row -->

<!-- CHECK IF ADDITIONAL ADMIN PAGES ARE PRESENT AND INCLUDE IF AVAILABLE -->

<?php
if(file_exists($abs_us_root.$us_url_root.'usersc/includes/admin_panels.php')){
	require_once $abs_us_root.$us_url_root.'usersc/includes/admin_panels.php';
}
?>

<!-- /CHECK IF ADDITIONAL ADMIN PAGES ARE PRESENT AND INCLUDE IF AVAILABLE -->

<div class="row "> <!-- rows for Info Panels -->
	<h2>Info Panels</h2>
	<div class="col-xs-12 col-md-6">
	<div class="panel panel-default">
	<div class="panel-heading"><strong>All Users</strong> <span class="small">(Who have logged in)</span></div>
	<div class="panel-body text-center">
	<div class="row">
		<div class="col-xs-3 "><h3><?=$hourCount?></h3><p>per hour</p></div>
		<div class="col-xs-3"><h3><?=$dayCount?></h3><p>per day</p></div>
		<div class="col-xs-3 "><h3><?=$weekCount?></h3><p>per week</p></div>
		<div class="col-xs-3 "><h3><?=$monthCount?></h3><p>per month</p></div>
	</div>
	</div>
	</div><!--/panel-->


	<div class="panel panel-default">
	

	</div> <!-- /col -->
	</div> <!-- /col2/2 -->
</div> <!-- /row -->







</div> <!-- /container -->
</div> <!-- /#page-wrapper -->

<!-- footers -->
<?php require_once $abs_us_root.$us_url_root.'users/includes/page_footer.php'; // the final html footer copyright row + the external js calls ?>

<!-- Place any per-page javascript here -->
	<script type="text/javascript">
	$(document).ready(function(){

	$("#times").load("times.php" );

	var timesRefresh = setInterval(function(){
	$("#times").load("times.php" );
	}, 30000);


  $('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover();
// -------------------------------------------------------------------------
		});
	</script>

<?php require_once $abs_us_root.$us_url_root.'users/includes/html_footer.php'; // currently just the closing /body and /html ?>
