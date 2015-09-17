<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Commissioner.Club — A SuperRhino website</title>
        <meta name="description" content="The Commissioner Club for Fantasy Football. It's the big show... of fake football leagues.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta property="og:image" content="http://superrhino.net/rpp/skyClouds.jpg">

    </head>
    <body style="margin:0;padding:0;">
        <!--[if lt IE 9]>
            <p class="browsehappy">You are using an <strong>old ass</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve the world wide web.</p>
        <![endif]-->

        <?php if ( isset($_GET['text']) ): ?>

        <!-- Add your site or application content here -->
        <h1>Commissioner.club!</h1>
        <h2>The swankiest fantasy football club on the web <a href="/">Commissioner.Club</a></h2>
        <p>What's here? Just some things:</p>
        <ul>
            <li><a href="http://games.espn.go.com/ffl/leagueoffice?leagueId=388206">Official League Page – ESPN</a>
            <li><a href="https://tackk.com/the-fantasy-commission">The Fantasy Commission League News – Tackk</a>
            <li><a href="https://tackk.com/tfc-records">TFC All-time Record Book</a>
            <li><a href="https://www.youtube.com/user/TheFantasyCommission">YouTube / TheFantasyCommission</a>
            <li><a href="https://twitter.com/TFC_Commish">@TFC_Commish</a>
        </ul>

        <?php else: ?>

        <div id="tackk-1dfjzs" style="margin:0;padding:0;overflow:hidden;width:100%;height:2085px">
            <iframe id="tackk-1dfjzs-frame" src="https://tackk.com/1dfjzs/embed" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
        </div>

        <?php endif; ?>

    </body>
</html>