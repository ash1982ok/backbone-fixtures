/**
 * backbone-fixtures
 *
 * (c) 2012 Sai Wong, Huffington Post
 * backbone-fixtures may be freely distributed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Plugin to Backbone.js to allow for model fixtures.
 *
 * @version 0.1.2
 * @url http://github.com/saiwong/backbone-fixtures
 */
;(function(B, $){
	if ( !B || B.syncFixtures === true ) return;
	
	var sync = B.sync;
	B.sync = function( method, model, options ){
		var useFixtures = B.fixtures === true || model.useFixtures === true || ( model.attributes && model.attributes.useFixtures === true ),
			fixtureType = 'json',
			fixturesRoot = model.fixturesRoot || ( model.attributes && model.attributes.fixturesRoot ) || B.fixturesRoot,
			url,
			fixturePath;
				

		// Add fixture loading for models that has it defined
		if ( useFixtures && 'fixture' in model ){

			// fixture path
			if ( typeof model.fixture === 'string' ){
				fixturePath = model.fixture;
				// fixture type
				if ( typeof model.fixtureType == 'string' ){
					fixtureType = model.fixtureType;
				}
				url = [
					fixturePath,
					'/',
					method,
					fixtureType ? '.' + fixtureType : ''
				].join('');
			}
			else if ( typeof model.fixture === 'object' ){
				var fixtureConfig = model.fixture[ method ];
				if ( typeof fixtureConfig === 'string' ){
					url = fixtureConfig;
				}
			}

			if ( typeof url == 'string' ){
				// add a service root to the service
				if ( typeof fixturesRoot === 'string' && url.indexOf('http') !== 0 ) {
					url = fixturesRoot + url;
				}

				options = $.extend({}, options, {
					url: url,
					type: 'GET',
					dataType: fixtureType,
					data: {}
				});
			}
		}
		return sync( method, model, options );
	};
	B.syncFixtures = true;
})(this.Backbone, this.jQuery);