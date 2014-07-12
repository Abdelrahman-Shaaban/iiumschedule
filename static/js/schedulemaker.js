/*! iiumschedule 2014-07-12 */
angular.module("smaker",["ngAnimate","pasvaz.bindonce"]).service("smglobal",["$rootScope","$q","$http",function(a,b,c){var d={mode:"startpage",schedule:{},coursearray:[],session:"",student_type:"",semester:"",sectioncache:{},cur_hover_section:void 0,loading_section_query:!1};return d.add_section=function(a){var b=d.has_collide(a);if(b)return void alert("This section collide with "+b.code+" section "+b.section);var c=a;d.section_added(a.section_id)||(d.subject_added(a.code)?alert("Another section has been selected for this subject. Please remove that first"):d.schedule[c.code]=c)},d.subject_added=function(a){return d.schedule[a]},d.section_added=function(a){return _.find(d.schedule,function(b){return b.section_id==a})},d.remove_section=function(a){var b=d.section_added(a);delete d.schedule[b.code]},d.replace_section=function(a,b){var c=d.subject_added(b.code);d.remove_section(c.section_id),d.add_section(a,b)},d.check_collide=function(a,b){return void 0!==_.find(a.schedule,function(a){return void 0!==_.find(b.schedule,function(b){return a.day==b.day&&(a.end<=b.end&&a.end>b.start||a.start>=b.start&&a.start<b.end)?!0:!1})})},d.has_collide=function(a){return _.find(d.schedule,function(b){return b.section_id!=a.section_id&&d.check_collide(b,a)?!0:!1})},d.section_preprocess=function(a,b){function c(a){if("M"==a)return"MON";if("T"==a)return"TUE";if("W"==a)return"WED";if("TH"==a)return"THUR";if("F"==a)return"FRI";if("SN"==a)return"SUN";if("S"==a)return"SAT";throw"Unknown day ->"+a}var d={section_id:a.id,code:b.code,credithour:b.ch,section:a.sectionno,title:b.title,lecturer:a.lecturer,venue:a.venue,time:a.time,day:a.day,schedule:[]},e=a.venue.split(" ");d.smallvenue=e[0];var f=/^([0-9\.]+)\s*-\s*([0-9\.]+)\s*(AM|PM)$/.exec(a.time),g=1,h=2;if(!f||4!=f.length)return console.log(" -  "==a.time?"WARNING:Unfortunately this section's schedule is not available yet. Please select another section,":"WARNING:Error: unable to identify the format for the time "+a.time+". Please be patient while we try to fix this issue"),d;g=parseFloat(f[1],10);var i=/^\D*([0-9\.]+)\D*$/.exec(f[2]);i?h=parseFloat(i[1],10):(console.log("Missing end time. Lets just say it use 1 hour."),h=g+1),"PM"==f[3]&&12>g&&12>h&&(g+=12,h+=12),d.starttime=g,d.endtime=h;var j=a.day,k=[];if(/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(j))k.push(j);else if(/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)-(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(j)){var l=/\s*(MON|TUE|WED|THUR|FRI|SAT|SUN)-(MON|TUE|WED|THUR|FRI|SAT|SUN)\s*/.exec(j);k.push(l[1]),k.push(l[2])}else if(/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(j)){var l=/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(j);k.push(c(l[1])),k.push(c(l[2])),k.push(c(l[3]))}else if(/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(j)){var l=/\s*(M|TH|W|T|F|SN|S)\s*-\s*(M|TH|W|T|F|SN|S)\s*/.exec(j);k.push(c(l[1])),k.push(c(l[2]))}else if("TWF"==j)k.push("TUE"),k.push("WED"),k.push("FRI");else{if(-1=="MTWTHF".indexOf(j))return console.log("Unknown day format ->"+j+" please be patient as we resolve this issue."),d;var m="MTWTHF".indexOf(j),n=j.length;-1!=j.indexOf("TH")&&n--,"F"==j&&(m-=1);for(var o=["MON","TUE","WED","THUR","FRI"],p=m;m+n>p;)k.push(o[p]),p++}return _.each(k,function(a){var b={day:a,start:g,end:h,venue:d.venue};d.schedule.push(b)}),d},d.fetch_section=function(e){function f(a){var b=a.data;d.sectioncache[e.id]=a;for(var c=[],f=0;f<b.length;f++){var g=d.section_preprocess(b[f],e);g?c.push(g):console.log("Warning, unable to preprocess section "+b[f].sectionno)}return b=c}var g=b.defer();return void 0!==d.sectioncache[e.id]?(setTimeout(function(){a.$apply(function(){g.resolve(f(d.sectioncache[e.id]))})}),g.promise):c({url:"/schedulemaker/fetch_section/",params:{id:e.id},method:"GET"}).then(f)},d}]).controller("schedulemaker",["smglobal","$scope","$http",function(a,b){function c(){if(b.schedule=_.values(a.schedule),void 0!==a.cur_hover_section){var c=$.extend({},a.cur_hover_section);c.hover=!0,b.schedule.push(c)}}b.smglobal=a,b.alert=function(a){console.log("This is alert "+a)},b.generateLink=function(){return location.origin+"/schedulemaker/?"+$.param({ses:a.session,sem:a.semester,st:a.student_type,code:_.pluck(a.schedule,"code").join(","),section:_.pluck(a.schedule,"section").join(",")})},b.$watchCollection("smglobal.schedule",c),b.$watch("smglobal.cur_hover_section",c)}]).controller("startform",["$scope","$http","smglobal","$timeout","$q","$rootScope",function(a,b,c,d,e){a.available_sessions=["2013/2014","2014/2015"],a.available_student_type={ug:"undergraduate",pg:"postgraduate"},a.session="2014/2015",a.student_type="ug",a.semester=1,a.start_form_submit=function(){if(a.start_form.session.$valid&&void 0!==a.start_form.session&&a.start_form.semester.$valid&&void 0!==a.start_form.session&&a.start_form.student_type.$valid&&void 0!==a.start_form.session){a.show_submit_error=!1,c.mode="startloading",_.extend(c,_.pick(a,"session","semester","student_type"));var d={session:a.session,semester:a.semester,coursetype:a.student_type};b({url:"/schedulemaker/fetch_subject/",params:d,method:"GET"}).success(function(a){if(c.mode="picker",_.each(a,function(a,b){_.each(a,function(a){a.kuly=b})}),c.coursearray=a,$(window).resize(),window.schedulequery){for(var b=window.schedulequery.code.split(","),d=window.schedulequery.section.split(","),f=[],g=0;g<b.length;){var h,i=b[g],j=d[g];_.find(a,function(a){return _.find(a,function(a){return a.code==i?(h=a,!0):void 0})}),void 0!==h?(!function(a,b){var d=c.fetch_section(b).then(function(b){_.find(b,function(b){b.section==a&&c.add_section(b)})});f.push(d)}(j,h),g++):(console.log("WARNING:Subject "+i+" not found"),g++)}e.all(f).then(function(){c.loading_section_query=!1})}}).error(function(){c.mode="startpage",c.loading_section_query=!0,alert("Sorry, an error happened when fetching subjects. The server may be down")})}else a.show_submit_error=!0,console.log("Submit called start form "+JSON.stringify(a.start_form.$valid))},window.schedulequery&&(a.session=window.schedulequery.ses,a.semester=window.schedulequery.sem,a.student_type=window.schedulequery.st,d(function(){a.start_form_submit()},10))}]).controller("sectionSelector",["$scope","smglobal","$filter",function(a,b,c){function d(){a.filteredSubject=""!==a.selected_kuly?c("filter")(a.asubject,{kuly:a.selected_kuly}):a.asubject,a.filteredSubject=c("filter")(a.filteredSubject,a.subsearch),a.filteredSubject.length>e?(a.filteredSubject=_.first(a.filteredSubject,e),a.scroll_limit_reached=!0):a.scroll_limit_reached=!1}_.extend(a,{selected_kuly:"",asubject:[],smglobal:b,mode:"subject",loading_section:!1,scroll_limit_reached:!1,selected_subject:{}});var e=300;a.$watch("selected_kuly",d),a.$watch("subsearch",d),a.$watch("asubject",d),a.toggle_selected=function(b){a.selected_kuly=a.selected_kuly==b?"":b},a.show_section=function(c){a.selected_subject=c,a.loading_section=!0,a.mode="section",b.fetch_section(c).then(function(b){a.csections=b,a.loading_section=!1},function(){alert("Sorry, failed to load section."),a.mode="subject",a.loading_section=!1})},a.$watchCollection(function(){return b.coursearray},function(){a.asubject=[],_.each(b.coursearray,function(b){_.each(b,function(b){a.asubject.push(b)})})})}]).directive("formattedSchedule",function(){return{scope:{template:"=?",schedule:"="},link:function(a,b){function c(){var c=a.schedule;void 0===c&&(c=[]);var e=d({coursearray:c});$(b).html(new EJS({text:$(a.template).html()}).render(e))}function d(a){function b(a){for(var b=[],c=0;a>c;)b.push(""),c+=1;return b}for(var c=a.coursearray,d=8,e=20,f=12*d,g=e-d,h=12*g,j={MON:b(h),TUE:b(h),WED:b(h),THUR:b(h),FRI:b(h),SAT:b(h),SUN:b(h)},k=0;k<c.length;){for(var l=c[k],m=0;m<l.schedule.length;){var n=l.schedule[m],o=n.start,p=n.end,q=Math.floor(o),r=o-q;r=Math.round(100*r/5),r+=12*q;var s=Math.floor(p),t=p-s;t=Math.round(100*t/5),t+=12*s;var u=t-r;for(j[n.day][r-f]={course:l,duration:u,venue:l.schedule[m].venue},i=1;u>i;)j[n.day][r-f+i]="none",i+=1;m+=1}k+=1}var v={byfiveminute:j,actualstarthour:d,actualendhour:e,courselist:c};return v}(void 0===a.template||""===a.template)&&(a.template="#schedtemplate"),a.$watch("schedule",c)}}}).directive("niceScroll",function(){return{link:function(a,b){$(b).niceScroll()}}}).controller("generator",["smglobal","$scope","$filter","$q",function(a,b,c,d){function e(){b.filteredSubject=""!==b.selected_kuly?c("filter")(b.asubject,{kuly:b.selected_kuly}):b.asubject,b.filteredSubject=c("filter")(b.filteredSubject,b.subsearch)}_.extend(b,{selected_kuly:"",asubject:[],smglobal:a,mode:"subject",selectedSubjects:[],result_threshold:50,actual_length:0}),_.each(a.schedule,function(c){c.code;_.find(a.coursearray,function(a){return _.find(a,function(a){return a.code==c.code?(b.selectedSubjects.push(a),!0):void 0})})}),b.$watch("selected_kuly",e),b.$watch("subsearch",e),b.$watch("asubject",e),b.sectioncount={},b.fetching_sections=!1;var f=0,g=function(){b.fetching_sections=!0,f++;var c=f,e={},g=[];_.each(b.selectedSubjects,function(c){var d=a.fetch_section(c);d.then(function(a){a.length&&(e[c.code]=a,b.sectioncount[c.code]=a.length)}),g.push(d)}),d.all(g).then(function(){function d(b,c){return 0===b.length?!1:_.find(b,function(b){return a.check_collide(b,c)})}function g(a,b){_.each(h[b],function(c){if(!d(a,c)){if(a.push(c),b<h.length-1)g(a,b+1);else if(b==h.length-1){var e=a.slice(0);j.push(e)}a.splice("-1",1)}})}if(c==f){b.fetching_sections=!1;var h=_.values(e),i=[],j=[];g(i,0),b.actual_length=j.length,b.results=j.length>b.result_threshold?_.first(j,b.result_threshold):j}},function(){console.log("Error, fail to fetch all section ")})};b.$watchCollection("selectedSubjects",g),b.$watchCollection("result_threshold",g),g(),b.toggle_selected=function(a){b.selected_kuly=b.selected_kuly==a?"":a},b.$watchCollection(function(){return a.coursearray},function(){b.asubject=[],_.each(a.coursearray,function(a){_.each(a,function(a){b.asubject.push(a)})})}),b.subjectAdded=function(a){var c=_.find(b.selectedSubjects,function(b){return b==a});return c},b.addSubject=function(a){b.subjectAdded(a)||b.selectedSubjects.push(a)},b.removeSubject=function(a){b.selectedSubjects=_.without(b.selectedSubjects,a)},b.toggleSubject=function(a){b.subjectAdded(a)?b.removeSubject(a):b.addSubject(a)},b.useResult=function(b){var c={};_.each(b,function(a){c[a.code]=a}),a.schedule=c,a.mode="picker"}}]).controller("formatterform",["$scope","smglobal","$http",function(a,b){a.smglobal=b,a._=window._,a.JSON=window.JSON,a.$watchCollection("smglobal.schedule",function(){var c=_.map(b.schedule,function(a){return _.pick(a,"code","credithour","schedule","section","title")});a.schedule=c}),a.token="",a.requested=!1,a.requesting=!1,a.save=function(){var c={scheduletype:"MAINCAMPUS",ic:"",matricnumber:"",program:"",semester:"",session:"",studentname:""};_.extend(c,_.pick(b,"ic","matricnumber","program","semester","session","studentname")),c.coursearray=a.schedule,a.requesting=!0,a.requested=!1,$.ajax({url:"/scheduleformatter/",type:"POST",data:{data:JSON.stringify(c)},success:function(b){a.$apply(function(){a.token=b,a.requested=!0,a.requesting=!1})},error:function(b){a.$apply(function(){a.requesting=!1,alert("Sorry, an error occur while saving schedule."),console.log("Error saving "+b)})}})}}]);