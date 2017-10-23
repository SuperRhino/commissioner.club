<!doctype html>
<head>
	<meta charset="utf-8">
	<title>The Fantasy Commission Keeper Eligibility</title>
	<style>
		body{ margin:0 auto; font:15px/16px Arial, sans-serif; width: 650px }
		body > div { padding:50px; margin:50px auto; background:#f0f0f0; }
		.list { margin: 0; padding: 5px 0 0; }
		.list .searchable { padding-left: 10px; }
		.list li { list-style: none; margin: 0; padding: 0; }
		input[type="text"] { font-size: 24px; width: 80%; }
		input[type="button"]{ font-size: 16px; }
		.examples { display: none; font-size: 12px; }
		#show-examples { font-size: 12px; padding-top: 3px;}
		h2{ margin-bottom: -10px; }
		h4{ margin: 50px 0 10px; color: #0097bb; }
		.subtext{ font-style: italic; font-size: 12px; color: #444; }
		.well { margin-top: 10px auto; border: 1px solid #aaa; background-color: #e0e0e0; padding: 10px; }
		.well ul { list-style-type: none; padding-left: 15px; }
		.well li { border-left: 4px solid #0097bb; margin: 5px 0 10px; padding-left: 10px; font-size: 20px; line-height: 1.2em; }
		p{ margin: 0 0 1em 0; }
        #not-found { display: none; color: #e06146; }
	</style>
</head>
<body>
	<?php
		// $draft[$roundNum][$pickNum] = $selection;
		include_once( 'draft-list.php' );
	?>
	<div>
		<h1>Keeper Eligibility</h1>
		<p><em>Type in the box below to find out keeper eligibility for a player. You can basically type anything you want, fools!</em></p>
		<p>
			<input type="text" placeholder="Search for player..." name="filter-keepers" value="" /> <input type="button" value="Clear" id="clear-filter" /><br />
			<a href="#" id="show-examples">Examples?</a>
		</p>
		<p class="examples">
		<em>
			"Peyton Hillis" will find player<br />
			"QB" will find (you get the point right?)<br />
			"Cle" should limit to Cleveland Browns (for the most part)<br />
			"Sky Clouds" will show my draft
		</em>
		</p>


		<div class="well">
			<h3>Keeper Rules</h3>
			<em>Re-draft in 2017 &mdash; Submit keepers to commish 1hr before draft</em>
			<ul>
				<li>Keep 0-3 players</li>
				<li>Cost is 3 rounds ahead of where the player was drafted</li>
				<li>Players drafted in rounds 1-3 are ineligible</li>
				<li>Undrafted players cost 13th round pick</li>
				<li>Multiple players of same price, cost a previous round.
					<em>e.g., Keeping 2 players that each cost a 10th round pick, consume the 10th &amp; 9th round picks.</em></li>
				<li>Draft-absent owners are disqualified from keepers.</li>
			</ul>
		</div>

		<?php

			$arr_elig["FA"] = [ 'title'=>"Ineligible", 'subtext'=>"Not allowed to be kept. They will enter the draft pool.", 'rounds'=>[1,2,3] ];
			$arr_elig["L1"] = [ 'title'=>"Keep as 1st Round Pick", 'rounds'=>[4] ];
			$arr_elig["L2"] = [ 'title'=>"Keep as 2nd Round Pick", 'rounds'=>[5] ];
			$arr_elig["L3"] = [ 'title'=>"Keep as 3rd Round Pick", 'rounds'=>[6] ];
			$arr_elig["L4"] = [ 'title'=>"Keep as 4th Round Pick", 'rounds'=>[7] ];
			$arr_elig["L5"] = [ 'title'=>"Keep as 5th Round Pick", 'rounds'=>[8] ];
			$arr_elig["L6"] = [ 'title'=>"Keep as 6th Round Pick", 'rounds'=>[9] ];
			$arr_elig["L7"] = [ 'title'=>"Keep as 7th Round Pick", 'rounds'=>[10] ];
			$arr_elig["L8"] = [ 'title'=>"Keep as 8th Round Pick", 'rounds'=>[11] ];
			$arr_elig["L9"] = [ 'title'=>"Keep as 9th Round Pick", 'rounds'=>[12] ];
			$arr_elig["L10"] = [ 'title'=>"Keep as 10th Round Pick", 'rounds'=>[13] ];
			$arr_elig["L11"] = [ 'title'=>"Keep as 11th Round Pick", 'rounds'=>[14] ];
			$arr_elig["L12"] = [ 'title'=>"Keep as 12th Round Pick", 'rounds'=>[15] ];

		?>

		<div class="list">
			<h2>Draft Results</h2>
            <h4 id="not-found">Not Found: Undrafted players can be kept as 13th round pick.</h4>
			<?php foreach( $arr_elig as $level=>$arrKeepInfo ): ?>
				<h4><?php echo $arrKeepInfo['title']; ?></h4>
                <?php if (isset($arrKeepInfo['subtext'])): ?>
				<p class="subtext"><?php echo $arrKeepInfo['subtext']; ?></p>
                <?php endif; ?>
				<?php foreach( $arrKeepInfo['rounds'] as $roundNum ): ?>
					<?php foreach( $draft[$roundNum] as $pickNum=>$selection ): ?>
					<div class="searchable"><?php echo $selection; ?></div>
					<?php endforeach; ?>
				<?php endforeach; ?>
			<?php endforeach; ?>
		</div>

		<!--
		<div class="well">
			<p>
				<strong>Exceptions:</strong><br />
				<em>Due to keeping two players from the same bucket some players have a different Level than displayed.</em>
			</p>
			<p>
				Mike Vick / Level 2<br />
				Rob Gronkowski / Level 2<br />
				Steelers D/ST / Level 2<br />
			</p>

		</div>
		-->

	</div>

	<!-- Scripts -->
	<script src="http://code.jquery.com/jquery.min.js"></script>
	<script src="/keepers/filter-keepers.js"></script>
</body>
</html>
