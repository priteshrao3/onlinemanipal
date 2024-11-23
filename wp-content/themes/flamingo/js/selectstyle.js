
/****************************************************************
* Selector plug that made select tag in to custome select style *
*****************************************************************/
(function($){
	$.fn.selectstyle = function(option){
		var defaults = {
			width  : 250,
			height : 200,
			theme  : 'light'
		},
		setting = $.extend({}, defaults, option);
		this.each(function(){
			var $this = $(this),
				parent = $(this).parent(),
				html = '',
				html_op = '',
				search = $this.attr('data-search'),
				name = $this.attr('name'),
				style = $this.attr('style'),
				placeholder = $this.attr('placeholder'),
				id = setting.fieldName;
			setting.width = (parseInt($this.attr('width') == null ? $this.width() : $this.attr('width') ) + 10 )+'px';
			setting.theme = $this.attr('theme') != null ? $this.attr('theme') : setting.theme;
			$this.find('option').each(function (e) {
				var $this_a = $(this),
					val = $this_a.val(),
					image = $this_a.attr('data-image'),
					text = $this_a.html();
				if(val == null){
					val = text;
				}
				html_op += '<li data-title="'+text+'" value="'+val+'"';
				if($this_a.attr('font-family') != null){
					html_op += ' style="font-family'+$this_a.attr('font-family')+'"';
				}
				html_op += '>';
				if(image != null){
					html_op += '<div class="ssli_image"><img src="'+image+'"></div>';
				}
				html_op += '<div class="ssli_text">'+text+'</div></li>';
			});
			$this.hide();

			html = 
			'<div class="selectstyle ss_dib '+setting.theme+'" style="width:'+parseInt(setting.width)+'px;">'+
				'<div id="select_style" class="ss_button" style="width:'+parseInt(setting.width)+'px;'+style+'">'+
					'<div class="ss_dib ss_text" id="select_style_text" style="margin-right:15px;width:'+(parseInt(setting.width) - 20)+'px;position:relative;">'+placeholder+'</div>'+
					'<div class="ss_dib ss_image"></div>'+
				'</div>';
			if(search == "true"){
				html += '<ul id="select_style_ul" sid="'+id+'" class="ss_ulsearch" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;"><div class="search" id="ss_search"><input type="text" placeholder="Type or Select"></div><ul style="max-height:'+(parseInt(setting.height) - 53)+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul></ul>';
			}
			else{
				html += '<ul id="select_style_ul" sid="'+id+'" style="max-height:'+setting.height+'px;width:'+(parseInt(setting.width) + 20)+'px;" class="ss_ul">'+html_op+'</ul>';
			}
			
			html += '</div>';
			$(html).insertAfter($this);
			
		});

		$("body").delegate( "div#ss_search input", "keyup", function(e) {
			var val = $(this).val(), flag=false;
			$('#nosearch').remove();
			$(this).parent().parent().find('li').each(function(index, el) {
				var SelVal = $(el).text().toLowerCase();
				if(SelVal.indexOf(val.toLowerCase()) > -1){
					$(el).show();
					flag=true;
				}
				else{
					$(el).hide();
				}
			});
			if (!flag) {$(this).parent().parent().append('<div class="nosearch" id="nosearch">Nothing Found</div>')};
		});
		$("body").delegate( "div#select_style", "click", function(e) {
			$('ul#select_style_ul').hide();
			var ul = $(this).parent('div').find('ul#select_style_ul');
			ul.show();
			var height = ul.height();
			var offset = $(this).offset();
			if(offset.top+height > $(window).height()){
				ul.css({
					marginTop: -(((offset.top+height) - $(window).height()) + 100)
				});
			}
		});
		// Updating the values when selecting values
		$("body").delegate("ul#select_style_ul li", "click", function(e) {
			var txt = $(this).data('title'),
			vl = $(this).attr('value'),
			sid = $(this).parent('ul').parent('ul').attr('sid');
			$(this).parents('ul#select_style_ul').hide();
			$(this).parents('ul#select_style_ul').parent('div').find('div#select_style_text').html(txt);
			if(txt){ $(this).parents('ul#select_style_ul').parent('div').addClass("active");}
			$("."+sid+" select").val(vl).change();
			// if(vl && sid == "courseField"){
			// 	var instituionName = '';
			// 	var MUJcourseList = ["BBA", "MBA", "BCA", "MCA", "B.Com", "M.Com", "MA.JMC"];
			// 	var MAHEcourseList = ["MSc Data Science", "MSc Business Analytics", "PGCP Business Analytics", "PGCP Logistics and Supply Chain", "Master of Business Administration"];
			// 	var TAPMIcourseList = ["MBA - Banking and Financial Services"];
			// 	var MITcourseList = ["Post Graduate Certificate Program in Data Science and Machine Learning"];
			// 	if (jQuery.inArray(vl, MUJcourseList) !== -1) {
			// 		var institutionName = 'Manipal University Jaipur';
			// 	} else if (jQuery.inArray(vl, MAHEcourseList) !== -1) {
			// 		var institutionName = 'Manipal Academy of Higher Education';
			// 	} else if (jQuery.inArray(vl, TAPMIcourseList) !== -1) {
			// 		var institutionName = 'T. A. Pai Management Institute';
			// 	} else if (jQuery.inArray(vl, MITcourseList) !== -1) {
			// 		var institutionName = 'Manipal Institute of Technology';
			// 	}
			// 	if(vl == "MBA" || vl == "Master of Business Administration"){
			// 		$(".institutionField #select_style_ul li").hide();
			// 		$('.institutionField #select_style_ul li[data-title="Manipal University Jaipur"]').show();
			// 		$('.institutionField #select_style_ul li[data-title="Manipal Academy of Higher Education"]').show();
			// 	} else if(institutionName) {
			// 		$('.institutionField #select_style_ul li[data-title="'+institutionName+'"]').click();
			// 		$(".institutionField #select_style_ul li").hide();
			// 		$('.institutionField #select_style_ul li[data-title="'+institutionName+'"]').show();
			// 		$(".institutionField select").val(institutionName).change();
			// 	}
			// }
			// $("."+sid+" select option[value="+vl+"]").attr('selected','selected');
		});
		// Hide the dropdown when clicking outside
		$(document).delegate("body", "click", function(e) {
			var clickedOn=$(e.target);
			if(!clickedOn.parents().is('ul#select_style_ul, div#select_style')){
				$('ul#select_style_ul').hide();
				$('div#ss_search').children('input').val('').trigger('keyup');
			}
		});
	}
})(jQuery);
