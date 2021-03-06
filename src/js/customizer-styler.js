var customizer_styler = (function parseCSS(css, iframe) {
  var predeflayout = {
    "General":{
      "defaultprop":{
        "selector":"#maindiv"
      },
      "controls":[
        {
          "css":"color"
        }, {
          "css":"text",
          "container":"accordion"
        }, {
          "css":"background",
          "container":"accordion"
        }, {
          "type":"group",
          "name":"Minute align tweaks",
          "controls":[
            {
              "selector":"#scheduletable .fixminutealign td.align",
              "css":"width",
              "max":15
            }
          ]
        }
      ]
    },
    "Title" : {
      "type" : "emptygroup",
      "defaultprop" : {
        "selector" : "#title"
      },
      "controls" : [{
        "css" : "color"
      }, {
        "css" : "text",
        "container":"accordion"
      }, {
        "css" : "text-shadow",
        "container":"accordion"
      }, {
        "css" : "margin",
        "container":"accordion"
      }]
    },
    "Personal Detail" : {
      "controls" : [
        {
          "type" : "group",
          "defaultprop" : {
            "selector" : "#detailtable"
          },
          "controls" : [{
            "css" : "color"
          }, {
            "css" : "width"
          }, {
            "css" : "text-align",
            "name" : "Alignment",
            "selector" : "#detailtablecont"
          }, {
            "css" : "text",
            "container" : "accordion"
          }, {
            "css" : "padding",
            "container" : "accordion",
            "selector" : "#detailtablecont"
          }]
        }]
    },
    "Schedule Table" : {
      "controls" : [{
        "type" : "group",
        "defaultprop" : {
          "selector" : "#scheduletable"
        },
        "controls" : [{
          "css" : "color"
        }, {
          "css" : "width"
        }, {
          "css" : "text-align",
          "name" : "Alignment",
          "selector" : "#scheduletablecont"
        }, {
          "css" : "text",
          "container" : "accordion"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "margin",
          "container" : "accordion"
        }, {
          "css" : "border",
          "container" : "accordion"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "group",
        "name" : "Time Header",
        "defaultprop" : {
          "selector" : "#scheduletable tr td.timecell"
        },
        "controls" : [{
          "css" : "color"
        }, {
          "css" : "width"
        }, {
          "css" : "height"
        }, {
          "css" : "background-color"
        }, {
          "css" : "text",
          "container" : "accordion"
        }, {
          "css" : "padding",
          "container" : "accordion"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border",
          "container" : "accordion"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "group",
        "name" : "Day Header",
        "defaultprop" : {
          "selector" : "#scheduletable td.day"
        },
        "controls" : [{
          "css" : "color"
        }, {
          "css" : "width"
        }, {
          "css" : "background-color"
        }, {
          "css" : "text",
          "container" : "accordion"
        }, {
          "css" : "padding",
          "container" : "accordion"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border",
          "container" : "accordion"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }]
    },
    "Table Cell" : {
      "controls" : [
        {
          "type" : "accordion",
          "name" : "General",
          "defaultprop" : {
            "selector" : "#scheduletable tr td",
          },
          "controls":[
            {
              "css":"color",
            },{
              "css":"width"
            },{
              "css":"height"
            },{
              "css":"text",
              "container" : "accordion"
            },{
              "css":"margin",
              "container" : "accordion"
            },{
              "css":"padding",
              "container" : "accordion"
            },{
              "css":"border",
              "container" : "accordion"
            },{
              "css":"box-shadow",
              "container" : "accordion"
            }
          ]  
        }, {
          "type" : "group",
          "name" : "Non Empty Cell",
          "defaultprop" : {
            "selector" : "#scheduletable tr td.nonempty"
          },
          "controls" : [{
            "css" : "color"
          }, {
            "css" : "background-color"
          }, {
            "css" : "text",
            "container" : "accordion"
          }, {
            "type" : "accordion",
            "name" : "Venue text",
            "defaultprop" : {
              "selector" : "#scheduletable tr td.nonempty .venue"
            },
            "controls" : [{
              "css" : "color"
            }, {
              "css" : "text"
            }, {
              "css" : "text-shadow",
              "container" : "accordion"
            }]
          }, {
            "type" : "accordion",
            "name" : "Code text",
            "defaultprop" : {
              "selector" : "#scheduletable tr td.nonempty .code"
            },
            "controls" : [{
              "css" : "color"
            }, {
              "css" : "text"
            }, {
              "css" : "text-shadow",
              "container" : "accordion"
            }]
          }, {
            "css" : "text-shadow",
            "container" : "accordion"
          }, {
            "css" : "border",
            "container" : "accordion"
          }, {
            "css" : "box-shadow",
            "container" : "accordion"
          }]
        }, {
          "type" : "group",
          "name" : "Empty Cell",
          "defaultprop" : {
            "selector" : "#scheduletable tr td.empty"
          },
          "controls" : [{
            "css" : "background-color"
          }, {
            "css" : "border",
            "container" : "accordion"
          }, {
            "css" : "padding",
            "container" : "accordion"
          }, {
            "css" : "box-shadow",
            "container" : "accordion"
          }]
        }]
    },
    "Course Table" : {
      "controls" : [{
        "type" : "group",
        "defaultprop" : {
          "selector" : "#coursetablediv"
        },
        "controls" : [{
          "name" : "Hide Table",
          "builder" : "checkbox",
          "css" : "display",
          "option" : {
            "checked" : "none",
            "unchecked" : "block"
          }
        }, {
          "css" : "text-align",
          "name" : "Alignment"
        }]
      }, {
        "css" : "width",
        "selector" : "#coursetable"
      },{
        "type" : "accordion",
        "name" : "general",
        "defaultprop" : {
          "selector" : "#coursetable"
        },
        "controls" : [{
          "css" : "text",
          "container" : "accordion"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border",
          "container" : "accordion"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Cell-General",
        "defaultprop" : {
          "selector" : "#coursetable td"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "text",
          "container" : "accordion"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border",
          "container" : "accordion"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }, {
          "css" : "padding",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Header",
        "defaultprop" : {
          "selector" : "#coursetable td.header"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "color"
        }, {
          "css" : "text"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Code",
        "defaultprop" : {
          "selector" : "#coursetable td.code"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "color"
        }, {
          "css" : "text"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Section",
        "defaultprop" : {
          "selector" : "#coursetable td.section"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "color"
        }, {
          "css" : "text"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Credit Hour",
        "defaultprop" : {
          "selector" : "#coursetable td.credithour"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "color"
        }, {
          "css" : "text"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }, {
        "type" : "accordion",
        "name" : "Course Name",
        "defaultprop" : {
          "selector" : "#coursetable td.name"
        },
        "controls" : [{
          "css" : "background-color"
        }, {
          "css" : "color"
        }, {
          "css" : "text"
        }, {
          "css" : "text-shadow",
          "container" : "accordion"
        }, {
          "css" : "border"
        }, {
          "css" : "box-shadow",
          "container" : "accordion"
        }]
      }]
    }
  };

  var palette={
  };

  var palettegallery=[];
   
  var options = {
    container : $("#mainbody"),
    predeflayout : predeflayout,
    preparse : true,
    searchlayout: false,
    palette:palette,
    palettegallery:palettegallery,
    color_picker:{
      static_path: "/static/styler/images/"
    }
  };
  return options;
})();

