import wixData from 'wix-data';

$w.onReady(function () {
	wixData.query("dsWebhookPayload")
    .count()
    .then( (num) => {
      let numberOfItems = num;
      let moreItems = numberOfItems - 4;
      if (moreItems > 0) {
        moreItems = 'plus ' + moreItems + ' additional items';
        $w('#moreItems').text = moreItems;
        $w('#moreItems').show();
      }
    } )
    .catch( (error) => {
      let errorMsg = error.message;
      let code = error.code;
    } );
  });



