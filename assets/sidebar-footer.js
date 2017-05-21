require(['gitbook', 'jQuery'], function (gitbook, $) {

  var sidebarFooter;
  var pluginConfig = {};


  /**
   * function to get json from url with callback
   */
  var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          callback(null, xhr.response);
        } else {
          callback(status);
        }
      };
      xhr.send();
  };


  function initializePlugin(config) {
    pluginConfig = config['sidebar-footer'];

    var online = null;

    getJSON('https://mafia2-online.com/api/v1/server',
    function(err, data) {
        if (err != null) {
            return online = "N/A";
        } else {
            // see every area, create option element, append it to select
            data.forEach(function(server) {
                if(server.id == "37") {
                  return online = server.lastPlayersCount;
                }
            });
        }
    });



    var text = pluginConfig.text;
    
    sidebarFooter
      = '<div class="sidebar-footer">Online: ' + online + '<br>'+ text +'</div>'
      ;

    /*
      = '<a id="forkmegithub" href="' + pluginConfig.url + '">'
      + '<img src="' + colorRibbon.src + '" alt="Fork me on GitHub"'
      + 'data-canonical-src="' + colorRibbon.canonicalSrc + '"></img>'
      + '</a>'
      ;
      */
  }

  function getPluginConfig() {
    return pluginConfig;
  }

  gitbook.events.bind('start', function (e, config) {
    initializePlugin(config);

/*
    gitbook.toolbar.createButton({
      icon: 'fa fa-github',
      label: 'GitHub',
      position: 'right',
      onClick: function() {
        window.open(pluginConfig.url);
      }
    });
    */
  });

  gitbook.events.bind('page.change', function() {
    var summaryUl = $('.book .book-summary .summary');
    summaryUl.append(sidebarFooter);
  });
});

/*

  <div class="sidebar-footer">
 */
