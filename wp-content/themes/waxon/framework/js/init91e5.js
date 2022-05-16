/*
 * Copyright (c) 2021 Marketify
 * Author: Marketify
 * This file is made for CURRENT THEME
*/


/*

	@Author: Marketify
	@URL: https://themeforest.net/user/marketify/portfolio


	This file contains the jquery functions for the actual theme, this
	is the file you need to edit to change the structure of the
	theme.

	This files contents are outlined below.

*/


var siteurl 	= fn_object.siteurl;

// All other theme functions
(function ($){

	"use strict";
	
    var WaxonInit 		= {
		
		
		
		pageNumber: 1,
		
        init: function () {
			this.cursor();
			this.blog_info();
			this.menuScroll();
			this.minHeightForPages();
			this.url_fixer();
			this.textSkin();
			this.projectCategoryFitler();
			this.portfolioFilter();
			this.hamburgerOpener__Mobile();
			this.submenu__Mobile();
			this.imgToSVG();
			this.isotopeMasonry();
			this.dataFnBgImg();
			this.estimateWidgetHeight();
			this.runPlayer();
			this.newPlayer();	
			this.categoryHook();	
			this.right_bar_height();
			this.toTopJumper();
			this.like();
			this.rating();
			this.recipe_video();
			this.search_opener();
			this.search_filter();
			this.fixedTotopScroll();
			this.prev_next_posts();
			this.widget__pages();
			this.widget__archives();
			this.select2();
			this.dataFnStyle();
			this.portfolioContentHeight();
			this.inputCheckBoxInComment();
			this.inlineStyle();
			this.projectHover();
			this.projectPopup();
			
			
			
			// since v1.0
			this.topbarBG();
			this.menuTextDuplicate();
			this.portfolioFilterOpener();
			this.anchor();
			this.totop();
			this.progress_line();
        },
		
		totopFeelIt: function(){
			var totop = $('.waxon_fn_progressbar');
			if(totop.length){
				var extraH = totop.width() + 100 /* height of the line */ + 19 /* spacing to line from the text */ + 25 /* spacing to bottom of window from the button*/;
				
				$(window).on('scroll',function(){
					var T = $(window).scrollTop();
					var H = $(window).innerHeight();
					var S = T+H;
					if(WaxonInit.between(S,WaxonInit.createNewObject(extraH))){
						totop.addClass('light');
					}else{
						totop.removeClass('light');
					}
				});
			}
		},
		
		createNewObject: function(height){
			var object = [];
			$('.darkbg').each(function(){
				var element	= $(this);
				var top     = element.offset().top;
				var bottom  = top + element.outerHeight();
				object.push([top+height,bottom+height]);
			});
			return object;
		},

		between: function (x, object) {
			var val = false;
			$.each(object,function(index,value){
				if(x >= value[0] && x <= value[1]){val = true;}
			});
			return val;
		},
		
		totop: function(){
			var text = $('.waxon_fn_progressbar .text');
			text.css({bottom: 105 + text.width()});
			$(".waxon_fn_progressbar a").on('click', function(e) {
				e.preventDefault();    
				$("html, body").animate({ scrollTop: 0 }, 'slow');
				return false;
			});
		},
		
		progress_line: function(){
			var line			= $('.waxon_fn_progressbar .line');
			var documentHeight 	= $(document).height();
			var windowHeight 	= $(window).height();
			var winScroll 		= $(window).scrollTop();
			var value 			= (winScroll/(documentHeight-windowHeight))*100;
			var position 		= value;

			line.css('height',position+"%");
			
			var progress	 	= $('.waxon_fn_progressbar');

			if(winScroll >= 100){
				progress.addClass('animate');
			}else{
				progress.removeClass('animate');
			}
		},
		
		anchor: function(){
			$('.waxon_fn_main_nav a').on('click',function(){
				var e 		= $(this),
					href 	= e.attr('href');
				if(this.pathname === window.location.pathname || href.indexOf("#") !== -1){
					if($(href).length){
						$([document.documentElement, document.body]).animate({
							scrollTop: $(href).offset().top
						}, 600);
						return false;
					}
				}
			});
		},
		
		portfolioFilterOpener: function(){
			var button	= $('.waxon_fn_ajax_portfolio .portfolio_trigger');

			button.off().on('click',function(){
				var element = $(this);
				var list 	= element.closest('.waxon_fn_ajax_portfolio').find('.filter_wrapper li');
				if(element.hasClass('opened')){
					element.removeClass('opened');
					list.removeClass('opened');
				}else{
					element.addClass('opened');
					list.each(function(i){
						var ele = $(this);
						setTimeout(function(){ele.addClass('opened');},i*100);
					});
				}
				return false;
			});	
		},
		
		menuTextDuplicate: function(){
			$('.link[data-text]').each(function(i,e){
				$(e).attr('data-text',$(e).text());
			});
		},
		
		topbarBG: function(){
			var topbar	 		= $('.waxon_fn_topbar');
			var offset			= $(window).scrollTop();
			WaxonInit.topbarBG__init(topbar,offset);
			$(window).on('scroll',function(){
				offset		= $(window).scrollTop();
				WaxonInit.topbarBG__init(topbar,offset);
			});
		},
		topbarBG__init: function(topbar,offset){
			if(offset >= 1){
				topbar.addClass('animate');
				$('body').addClass('fn__animate');
			}else{
				topbar.removeClass('animate');
				$('body').removeClass('fn__animate');
			}
		},
		
		
		blog_info: function(){
			if($('.blog_info').height() === 0){
				$('.waxon_fn_comment').addClass('margin-no-top');
			}
			if($('.wp-calendar-nav').length){
				$('.wp-calendar-nav').each(function(){
					var e = $(this);
					if(!e.find('a').length){
						e.remove();
					}
				});
			}
		},
		
		projectPopup: function(){
			$('.waxon_popup_gallery').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					delegate: 'a.zoom', // the selector for gallery item
					type: 'image',
					gallery: {
					  enabled:true
					},
					removalDelay: 300,
					mainClass: 'mfp-fade'
				});

			});
			$('.waxon_popup_youtube, .waxon_popup_vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.waxon_popup_soundcloude').each(function(){
				$(this).magnificPopup({
					type : 'image',
					gallery: {
						enabled: true, 
					},
				});	
			});
		},
		
		projectHover: function(){
			$('.waxon_fn_ajax_portfolio .posts_list .item').on('mouseenter', function() {
				if ($(this).data('title')) {
					$('.waxon_fn_portfolio_titles').html($(this).data('title') + '<span class="work__cat">' + $(this).data('category') + '</span>');
					$('.waxon_fn_portfolio_titles').addClass('visible');
				}

				$(document).on('mousemove', function(e) {
					$('.waxon_fn_portfolio_titles').css({
						left: e.clientX - 10,
						top: e.clientY + 25
					});
				});
			}).on('mouseleave', function() {
				$('.waxon_fn_portfolio_titles').removeClass('visible');
			});
			this.projectPopup();
		},
		
		
		runPreloader: function(){
			var self = this;
			setTimeout(function(){self.preloader();},500);
		},
		
		preloader: function(){
			var isMobile 	= /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
			var preloader 	= $('.waxon_fn_pageloader');
			if (!isMobile) {
				setTimeout(function() {
					preloader.addClass('fn_ready');
				}, 800);
				setTimeout(function() {
					preloader.remove();
				}, 2000);
			}else{
				preloader.remove();
			}
			var speed = 0;
			if($('.fn_cs_hero').length){
				speed = 2500;
			}
			if(preloader.length){
				speed = 2000;
			}
			setTimeout(function(){
				$('.waxon_fn_topbar').addClass('opened');
			}, speed);
		},
		
		inlineStyle: function(){
			var s = '';
			$('.waxon_fn_style').each(function(){
				var e = $(this), v = e.val(); e.val(''); s+= v;
			});
			$('body').append(s);
		},
		
		inputCheckBoxInComment: function(){
			if($('p.comment-form-cookies-consent input[type=checkbox]').length){
				$('p.comment-form-cookies-consent input[type=checkbox]').wrap('<label class="fn_checkbox"></label>').after('<span></span>');
			}
		},
		
		portfolioContentHeight: function(){
			var portfolio = $('.waxon_fn_portfolio_page .portfolio_content');
			if(portfolio.height() === 0){
				portfolio.css({display: 'none'});
			}
		},
		
		dataFnStyle: function(){
			$('[data-fn-style]').each(function(){
				var el		= $(this);
				var s 		= el.attr('data-fn-style');
				$.each(s.split(';'),function(i,e){
					el.css(e.split(':')[0],e.split(':')[1]);
				});
			});
		},
		
		menuScroll: function(){
			var H 				= $(window).height(),
				header			= $('.waxon_fn_header'),
				nav				= header.find('.header_nav'),
				logoH			= header.find('.fn_logo').outerHeight(true,true),
				searchH			= header.find('.search_wrap').outerHeight(true,true),
				copyH			= header.find('.header_copyright').outerHeight(true,true),
				adminBarH		= 0;
			if($('body').hasClass('admin-bar')){
				adminBarH	= 32;
			}
			nav.css({maxHeight: (H-logoH-searchH-copyH-adminBarH-100) + 'px'});
			if($().niceScroll){
				nav.getNiceScroll().remove();
				nav.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #e5e5e5"
				});
			}
		},
		
		minHeightForPages: function(){
			var H 				= $(window).height(),
				headerH 		= 0,
				mobileH 		= 0,
				adminBarH 		= 0,
				footerH 		= $('.waxon_fn_footer').height(),
				mobile			= $('.waxon_fn_mobilemenu_wrap'),
				header			= $('.waxon_fn_topbar');
				headerH 		= header.outerHeight(true,true);
			if(mobile.css('display') !== 'none'){
				mobileH			= mobile.height();
				headerH			= 0;
			}
			if($('body').hasClass('admin-bar')){
				adminBarH = $('#wpadminbar').height();
			}
			$('.waxon_fn_content').css({paddingTop: headerH+mobileH-adminBarH});
			$('.waxon_fn_pages,.waxon_fn_404').css({minHeight: (H-mobileH-headerH-footerH-adminBarH) + 'px'});	
		},
		
		url_fixer: function(){
			$('a[href*="fn_ex_link"]').each(function(){
				var oldUrl 	= $(this).attr('href'),
					array   = oldUrl.split('fn_ex_link/index.html'),
					newUrl  = siteurl + "/" + array[1];
				$(this).attr('href', newUrl);
			});
		},
		
		textSkin: function(){
			$('body').addClass('fn__text_skin_'+$('.waxon-fn-wrapper').data('text-skin'));
		},
		
		
		
		portfolioFilter: function(){
			var self					= this;
			$('.waxon_fn_portfolio_page .fn_ajax_more a').off().on('click',function(){
				var thisButton 			= $(this);
				var more				= thisButton.closest('.fn_ajax_more');
				var input				= more.find('input');
				var abb					= thisButton.closest('.waxon_fn_portfolio_page');
				var filter_page			= parseInt(input.val());
				if(thisButton.hasClass('active')){
					return false;
				}
				if(!abb.hasClass('go') && !more.hasClass('disabled')){
					abb.addClass('go');
					
					var requestData = {
						action: 'waxon_fn_ajax_portfolio',
						filter_page: filter_page,
					};

					
					$.ajax({
						type: 'POST',
						url: fn_ajax_object.fn_ajax_url,
						cache: false,
						data: requestData,
						success: function(data) {
							var fnQueriedObj 	= $.parseJSON(data);
							var html			= fnQueriedObj.data;
							var $grid			= abb.find('.posts_list');
							var $items;
							$items = $(html);
							input.val(filter_page+1);
							input.change();
							
							if(fnQueriedObj.disabled === 'disabled'){
								more.addClass('disabled');
							}
						 	$grid.append( $items ).isotope( 'appended', $items );
							setTimeout(function(){
								$grid.isotope({
									itemSelector: 'li',
									masonry: {},
									stagger: 30
								});
							},500);
							self.dataFnStyle();
							self.dataFnBgImg();
							self.projectHover();
							abb.removeClass('go');
						},
						error: function(xhr, textStatus, errorThrown){
							abb.removeClass('go');
						}
					});
				}
					
				
				return false;
			});	
		},
		
		projectCategoryFitler: function(){
			if($().isotope){
				var items = $('.waxon_fn_ajax_portfolio');
				items.each(function() {
					var thisItem 	= $(this);
					var list 		= thisItem.find('.posts_list');
					var filter 		= thisItem.find('.filter_wrapper ul');
					
					list.isotope({
					  	itemSelector: 'li',
						masonry: {},
						stagger: 30
					});

					// Isotope Filter 
					filter.find('a').off().on('click', function() {
						var selector = $(this).attr('data-filter');
						list = thisItem.find('.posts_list');
						filter.find('a').removeClass('current');
						$(this).addClass('current');
						list.isotope({
							filter: selector,
							animationOptions: {
								duration: 750,
								easing: 'linear',
								queue: false
							}
						});
						return false;
					});

				});
			}
			
		},
		
		cursor: function () {
			var myCursor = $('.frenify-cursor');
			if (myCursor.length) {
				if ($("body").length) {
					const e = document.querySelector(".cursor-inner"),
						t = document.querySelector(".cursor-outer");
					var n, i = 0,W = 0,intro = 0,
						o = !1;
					if($('.waxon_fn_intro').length){intro=1;}
					
					var buttons = "fn_cs_intro_testimonials .prev, .fn_cs_intro_testimonials .next, .fn_cs_swiper_nav_next, .fn_cs_swiper_nav_prev, .fn_dots, .swiper-button-prev, .swiper-button-next, .fn_cs_accordion .acc_head, .waxon_fn_popupshare .share_closer, .waxon_fn_header .fn_finder, .waxon_fn_header .fn_trigger, a, input[type='submit'], .cursor-link, button, .lightbox";
					var sliders = ".owl-carousel, .swiper-container, .cursor-link";
					// link mouse enter + move
					window.onmousemove = function(s) {
						o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
					}, $("body").on("mouseenter", buttons, function() {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
					}), $("body").on("mouseleave", buttons, function() {
						$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
					}), e.style.visibility = "visible", t.style.visibility = "visible";
					
					
					// Intro functions
					var intro_left 	= '.waxon_fn_intro .left';
					var intro_right = '.waxon_fn_intro .right';
					var intro_price = '.waxon_fn_intro_fixed_price .anim';
					$('body').on('mouseenter', intro_left, function(){
						e.classList.add('left-demo');
						t.classList.add('left-demo');
					}).on('mouseleave', intro_left,function(){
						e.classList.remove('left-demo');
						t.classList.remove('left-demo');
					});
					$('body').on('mouseenter', intro_right, function(){
						e.classList.add('right-demo');
						t.classList.add('right-demo');
					}).on('mouseleave', intro_right,function(){
						e.classList.remove('right-demo');
						t.classList.remove('right-demo');
					});
					$('body').on('mouseenter', intro_price, function(){
						e.classList.add('intro-price');
						t.classList.add('intro-price');
					}).on('mouseleave', intro_price,function(){
						e.classList.remove('intro-price');
						t.classList.remove('intro-price');
					});
					
					// slider mouse enter
					$('body').on('mouseenter', sliders, function(){
						e.classList.add('cursor-slider');
						t.classList.add('cursor-slider');
					}).on('mouseleave', sliders,function(){
						e.classList.remove('cursor-slider');
						t.classList.remove('cursor-slider');
					});
					
					// slider mouse hold
					$('body').on('mousedown', sliders, function(){
						e.classList.add('mouse-down');
						t.classList.add('mouse-down');
					}).on('mouseup', sliders, function(){
						e.classList.remove('mouse-down');
						t.classList.remove('mouse-down');
					});

					// forced dark
					$('body').on('mouseenter', '.darkbg', function(){
						e.classList.add('dark');
						t.classList.add('dark');
					}).on('mouseleave', '.darkbg',function(){
						e.classList.remove('dark');
						t.classList.remove('dark');
					});
				}
			}
		},
		
		select2: function(){
			$('.fn_contact select').select2();
		},
		
		widget__archives: function(){
			$('.widget_archive li').each(function(){
				var e = $(this);
				var a = e.find('a').clone();
				$('body').append('<div class="frenify_hidden_item"></div>');
				$('.frenify_hidden_item').html(e.html());
				$('.frenify_hidden_item').find('a').remove();
				var suffix = $('.frenify_hidden_item').html().match(/\d+/); // 123456
				$('.frenify_hidden_item').remove();
				suffix = parseInt(suffix);
				if(isNaN(suffix)){
					return false;
				}
				suffix = '<span class="count">'+suffix+'</span>';
				e.html(a);
				e.append(suffix);
			});
		},
		
		prev_next_posts: function(){
			if($('.waxon_fn_siblings')){
				$(document).keyup(function(e) {
					if(e.key.toLowerCase() === 'p') {
						var a = $('.waxon_fn_siblings').find('a.previous_project_link');
						if(a.length){
							window.location.href = a.attr('href');
							return false;
						}
					}
					if(e.key.toLowerCase() === 'n') {
						var b = $('.waxon_fn_siblings').find('a.next_project_link');
						if(b.length){
							window.location.href = b.attr('href');
							return false;
						}
					}
				});
			}
		},
		
		fixedTotopScroll: function(){
			var totop			= $('.waxon_fn_totop');
			var height 			= parseInt(totop.find('input').val());
			if(totop.length){
				if($(window).scrollTop() > height){
					totop.addClass('scrolled');
				}else{
					totop.removeClass('scrolled');
				}
			}
		},
		
		search_placeholder: function(searchinput,text,i,speed){
			setTimeout(function(){
				searchinput.attr('placeholder',text);
			},i*speed);
		},
		
		search_opener: function(){
			var self		= this;
			var speed		= 10;
			var searchbox 	= $('.waxon_fn_searchpopup');
			var opener 		= $('.waxon_fn_header .fn_finder');
			var searchinput = $('.waxon_fn_searchpopup input[type=text]');
			if(opener.length){
				opener.off().on('click',function(){
					if($('body').hasClass('open_search_popup')){
						searchbox.removeClass('focused');
						$('body').removeClass('open_search_popup');
					}else{
						var placeholder = searchinput.attr('placeholder');
						searchinput.attr('placeholder','');
						var array 		= placeholder.split('');
						$('body').addClass('open_search_popup');
						setTimeout(function(){
							var text = '';
							for(var i=0;i<array.length;i++){
								text+= array[i];
								self.search_placeholder(searchinput,text,i,speed);
							}
							setTimeout(function(){
								searchinput.focus();
								searchinput.trigger('click');
							},speed*array.length);
						},500);
					}
					return false;
				});
			}
			if(searchbox.length){
				var closer  	= searchbox.find('.search_closer,.extra_closer');
				var inputText  	= searchbox.find('input[type=text]');
				var inputSubmit	= searchbox.find('input[type=submit]');
				searchbox.find('.search_inner').off().on('click',function(){
					searchbox.removeClass('focused');
				});
				inputText.off().on('click',function(event){
					searchbox.addClass('focused');
					event.stopPropagation();
				});
				inputSubmit.off().on('click',function(event){
					event.stopPropagation();
				});
				closer.off().on('click',function(event){
					event.stopPropagation();
					searchbox.removeClass('focused');
					$('body').removeClass('open_search_popup');
					closer.addClass('closed');
					setTimeout(function(){
						closer.removeClass('closed');
					},500);
				});
			}	
		},
		
		paginationFilter: function(){
			var self			= this;
			if($('.waxon_fn_search_recipes').length){
				var pagination 	= $('.waxon_fn_search_recipes .my_pagination a');
				pagination.off().on('click',function(){
					var el		= $(this);
					var li		= el.parent();
					if(!li.hasClass('current')){
						self.filterAjaxCall(el,el.html());
					}
					return false;
				});
			}
		},
		
		search_filter: function(){
			var self						= this;
			if($('.waxon_fn_search_recipes').length){
				self.paginationFilter();
				var inputWrapper			= $('.waxon_fn_search_recipes .input_wrapper');
				
				
				var textFilter				= $('.waxon_fn_search_recipe_filter.text_filter');
				var textInput				= textFilter.find('input[type="text"]');
				
				var categoryFilter			= $('.waxon_fn_search_recipe_filter.category_filter');
				var categoryPopup			= categoryFilter.find('.filter_popup_list');
				var categoryInput			= categoryFilter.find('input[type="text"]');
				var categoryHidden			= categoryFilter.find('input[type="hidden"]');
				var categoryNewValue		= categoryFilter.find('.new_value');
				var categoryPlaceholder		= categoryInput.attr('data-placeholder');
				var categoryType			= categoryInput.attr('data-type');
				
				var difficultyFilter		= $('.waxon_fn_search_recipe_filter.difficulty_filter');
				var difficultyPopup			= difficultyFilter.find('.filter_popup_list');
				var difficultyInput			= difficultyFilter.find('input');
				var difficultyPlaceholder	= difficultyInput.attr('data-placeholder');
				var difficultyType			= difficultyInput.attr('data-type');
				
				var countryFilter			= $('.waxon_fn_search_recipe_filter.country_filter');
				var countryPopup			= countryFilter.find('.filter_popup_list');
				var countryInput			= countryFilter.find('input');
				var countryPlaceholder		= countryInput.attr('data-placeholder');
				var countryType				= countryInput.attr('data-type');
				
				inputWrapper.off().on('click',function(){
					$('.waxon_fn_search_recipes .filter_popup_list .item').show(); //added new
					$('.waxon_fn_search_recipes .filter_popup_list .no_records').remove(); //added new
				});
				
				
				/************************/
				/* Filter by Text */
				/************************/
				var oldValue = textInput.val();
				var myVar 	= null;
				textInput.off().on('keyup', function(){
					var element		= $(this);
					if(element.val() === oldValue){
						return false;
					}
					if(element.val() === ''){
						textFilter.removeClass('ready filtered opened');
					}else{
						textFilter.addClass('ready filtered opened');
					}
					oldValue = element.val();
					clearTimeout(myVar);
					myVar = setTimeout(function(){ 
						self.filterAjaxCall(element);
					}, 700);
					return false;
				}).focusout(function() {
					textFilter.removeClass('opened');
				}).focus(function() {
					textFilter.addClass('opened');
				});
				
				/* remove filter */
				textFilter.find('.icon').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el	= $(this);
					
					textInput.val(''); // added new
					textFilter.removeClass('ready filtered opened');
					
					self.filterAjaxCall(el);
				});
				
				/************************/
				/* Filter by Country */
				/************************/
				
				
				/* remove popup on window click */
				$(window).on('click',function(){
					countryFilter.removeClass('opened');
				});
				
				/* open popup on filter click */
				countryFilter.on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					difficultyFilter.removeClass('opened');
					categoryFilter.removeClass('opened');
					countryFilter.addClass('opened');
				});
				
				/* change placeholder to "Type Something" and backward */
				countryInput.focusout(function() {
					countryInput.attr('placeholder', countryPlaceholder);
				}).focus(function() {
					countryInput.attr('placeholder', countryType);
				});
				
				/* live search */
				countryInput.on('keyup', function(){
					var searchText 	= $(this).val().toUpperCase();
					var list 		= countryPopup.find('.filter_popup_list_in');
					var item 		= list.children('.item');
					var span, i, txtValue, counter=0;
					var norecord 	= list.find('.no_records');

					if(searchText !== ''){
						countryFilter.addClass('ready clear');
					}else{
						countryFilter.removeClass('ready clear');
					}
					for (i = 0; i < item.length; i++) {
						span 		= item[i].getElementsByTagName("span")[0];
						txtValue 	= span.textContent || span.innerText;
						if (txtValue.toUpperCase().indexOf(searchText) > -1) {
							item[i].style.display = "";
							counter--;
						} else {
							item[i].style.display = "none";
							counter++;
						}

					}
					if(counter === item.length && !norecord.length){
						list.append('<div class="no_records"><span>'+self.noRecords+'</span></div>');
					}else if(counter !== item.length){
						list.find('.no_records').remove();
					}

				});
				
				/* select function */
				countryPopup.find('.item').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el 			= $(this);
					var statusName 	= el.data('name');

					if(!el.hasClass('sending')){
						el.addClass('sending');
						el.siblings().removeClass('sending');
						countryInput.attr('placeholder',''); // remove placeholder
						countryInput.val(statusName);
						countryFilter.addClass('ready'); // to enable reset button
						countryFilter.removeClass('opened');

						countryFilter.addClass('filtered');
						self.filterAjaxCall(el);
					}

					return false;
				});
				
				/* remove filter */
				countryFilter.find('.icon').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el	= $(this);
					difficultyFilter.removeClass('opened');
					categoryFilter.removeClass('opened');
					
					countryInput.val(''); // added new
					countryPopup.find('.item').show(); //added new
					countryPopup.find('.no_records').remove(); // added new
					countryInput.attr('placeholder',countryPlaceholder);
					countryFilter.removeClass('ready');
					countryPopup.find('.item').removeClass('sending');
					countryFilter.removeClass('opened');
					countryFilter.removeClass('filtered');
					
					self.filterAjaxCall(el);
				});
				
				/************************/
				/* Filter by Difficulty */
				/************************/
				
				
				/* remove popup on window click */
				$(window).on('click',function(){
					difficultyFilter.removeClass('opened');
				});
				
				/* open popup on filter click */
				difficultyFilter.on('click',function(e){
					e.preventDefault();
					e.stopPropagation();

					categoryFilter.removeClass('opened');
					countryFilter.removeClass('opened');
					difficultyFilter.addClass('opened');
				});
				
				/* change placeholder to "Type Something" and backward */
				difficultyInput.focusout(function() {
					difficultyInput.attr('placeholder', difficultyPlaceholder);
				}).focus(function() {
					difficultyInput.attr('placeholder', difficultyType);
				});
				
				/* live search */
				difficultyInput.on('keyup', function(){
					var searchText 	= $(this).val().toUpperCase();
					var list 		= difficultyPopup.find('.filter_popup_list_in');
					var item 		= list.children('.item');
					var span, i, txtValue, counter=0;
					var norecord 	= list.find('.no_records');

					if(searchText !== ''){
						difficultyFilter.addClass('ready clear');
					}else{
						difficultyFilter.removeClass('ready clear');
					}
					for (i = 0; i < item.length; i++) {
						span 		= item[i].getElementsByTagName("span")[0];
						txtValue 	= span.textContent || span.innerText;
						if (txtValue.toUpperCase().indexOf(searchText) > -1) {
							item[i].style.display = "";
							counter--;
						} else {
							item[i].style.display = "none";
							counter++;
						}

					}
					if(counter === item.length && !norecord.length){
						list.append('<div class="no_records"><span>'+self.noRecords+'</span></div>');
					}else if(counter !== item.length){
						list.find('.no_records').remove();
					}

				});
				
				/* select function */
				difficultyPopup.find('.item').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el 			= $(this);
					var statusName 	= el.data('name');

					if(!el.hasClass('sending')){
						el.addClass('sending');
						el.siblings().removeClass('sending');
						difficultyInput.attr('placeholder',''); // remove placeholder
						difficultyInput.val(statusName);
						difficultyFilter.addClass('ready'); // to enable reset button
						difficultyFilter.removeClass('opened');

						difficultyFilter.addClass('filtered');
						self.filterAjaxCall(el);
					}

					return false;
				});
				
				/* remove filter */
				difficultyFilter.find('.icon').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el	= $(this);
					countryFilter.removeClass('opened');
					categoryFilter.removeClass('opened');
					
					difficultyInput.val(''); // added new
					difficultyPopup.find('.item').show(); //added new
					difficultyPopup.find('.no_records').remove(); // added new
					difficultyInput.attr('placeholder',difficultyPlaceholder);
					difficultyFilter.removeClass('ready');
					difficultyPopup.find('.item').removeClass('sending');
					difficultyFilter.removeClass('opened');
					difficultyFilter.removeClass('filtered');
					
					self.filterAjaxCall(el);
				});
				
				
				
				
				
				/**********************/
				/* Filter by Category */
				/**********************/
				
				
				/* remove popup on window click */
				$(window).on('click',function(){
					categoryFilter.removeClass('opened');
				});
				
				/* open popup on filter click */
				categoryFilter.on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					difficultyFilter.removeClass('opened');
					countryFilter.removeClass('opened');
					categoryFilter.addClass('opened');
					categoryInput.focus();
				});
				
				/* change placeholder to "Type Something" and backward */
				categoryInput.focusout(function() {
					if(categoryNewValue.html() === ''){
						categoryInput.attr('placeholder', categoryPlaceholder);
					}else{
						categoryInput.attr('placeholder', '');
					}
					
				}).focus(function() {
					categoryInput.attr('placeholder', categoryType);
				});
				
				/* live search */
				categoryInput.on('keyup', function(){
					var searchText 	= $(this).val().toUpperCase();
					var list 		= categoryPopup.find('.filter_popup_list_in');
					var item 		= list.children('.item');
					var span, i, txtValue, counter=0;
					var norecord 	= list.find('.no_records');

					if(searchText !== ''){
						categoryFilter.addClass('ready clear');
					}else{
						categoryFilter.removeClass('ready clear');
					}
					for (i = 0; i < item.length; i++) {
						span 		= item[i].getElementsByTagName("span")[0];
						txtValue 	= span.textContent || span.innerText;
						if (txtValue.toUpperCase().indexOf(searchText) > -1) {
							item[i].style.display = "";
							counter--;
						} else {
							item[i].style.display = "none";
							counter++;
						}

					}
					if(counter === item.length && !norecord.length){
						list.append('<div class="no_records"><span>'+self.noRecords+'</span></div>');
					}else if(counter !== item.length){
						list.find('.no_records').remove();
					}

				});
				
				/* select function */
				categoryPopup.find('.item').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el 			= $(this);
					var statusName 	= el.data('name');
					var array = [],newvalue = '';
					
					if(categoryHidden.val() !== ''){
						array = categoryHidden.val().split(',');
					}

					categoryInput.val('');
					categoryPopup.find('.item').show();
					categoryPopup.find('.no_records').remove();
					categoryInput.attr('placeholder','');
					categoryInput.bind('click');
					
					if(!el.hasClass('sending')){
						el.addClass('sending');
						array.push(statusName);
					}else{
						el.removeClass('sending');
						var index = array.indexOf(statusName);
						if (index > -1) {
							array.splice(index, 1);
						}
					}
					categoryHidden.val(array.join(','));
					categoryHidden.triggerHandler("change");
					if(array.length){
						categoryFilter.addClass('ready'); // to enable reset button
						categoryFilter.addClass('filtered');
						newvalue += ''+array[0];
						if(array.length > 1){
							newvalue += ', + ' + (array.length - 1);
						}
					}else{
						categoryFilter.removeClass('ready'); // to disable reset button
						categoryFilter.removeClass('filtered');
					}
					categoryNewValue.html(newvalue);
					categoryInput.focus();
					self.filterAjaxCall(el);

					return false;
				});
				
				/* remove filter */
				categoryFilter.find('.icon').off().on('click',function(e){
					e.preventDefault();
					e.stopPropagation();
					var el	= $(this);
					difficultyFilter.removeClass('opened');
					countryFilter.removeClass('opened');
					
					categoryHidden.val('');
					categoryHidden.triggerHandler("change");
					categoryInput.val(''); // added new
					categoryNewValue.html('');
					categoryPopup.find('.item').show(); //added new
					categoryPopup.find('.no_records').remove(); // added new
					categoryInput.attr('placeholder',categoryPlaceholder);
					categoryFilter.removeClass('ready');
					categoryPopup.find('.item').removeClass('sending');
					categoryFilter.removeClass('opened');
					categoryFilter.removeClass('filtered');
					
					self.filterAjaxCall(el);
				});
			}
		},
		getQueryVariable: function(url, variable) {
			var query = url.substring(1);
			var vars = query.split('&');
			for (var i=0; i<vars.length; i++) {
				var pair = vars[i].split('=');
				if (pair[0] === variable) {
					return pair[1];
				}
			}

			return false;
		},
		filterAjaxCall: function(element,filter_page){
			var pagination = true;
			if ( typeof filter_page === 'undefined') {
			  	filter_page			= 1;
			  	pagination			= false;
			}
			var parent = element.closest('.waxon_fn_search_recipes');
			if(parent.hasClass('loading')){
				return false;
			}
			var self					= this;
			var filter_difficulty		= '*';
			var filter_country			= '*';
			var filter_category_array	= '';
			filter_category_array 		= parent.find('.category_filters').val();
			if(parent.find('.filter_popup_list.difficulty div.sending').length){
				filter_difficulty		= parent.find('.filter_popup_list.difficulty .sending').data('filter');
			}
			if(parent.find('.filter_popup_list.country div.sending').length){
				filter_country			= parent.find('.filter_popup_list.country .sending').data('filter');
			}
			var search_term 			= parent.find('.text_filter input').val();
			var requestData = {
				action: 'waxon_fn_search_filter',
				filter_category_array: filter_category_array,
				filter_difficulty: filter_difficulty,
				filter_country: filter_country,
				filter_page: filter_page,
				search_term: search_term,
			};
			


			$.ajax({
				type: 'POST',
				url: fn_ajax_object.fn_ajax_url,
				cache: false,
				data: requestData,
				success: function(data) {
					var fnQueriedObj 	= $.parseJSON(data);
					var html			= fnQueriedObj.waxon_fn_data;
					parent.find('.post_section_in').html(html);
					self.dataFnBgImg();
					self.imgToSVG();
					self.like();
					parent.removeClass('loading');
					
					var speed		= 800;
					if(!pagination){
						speed 		= 0;
					}
					var listItem 	= parent.find('.my_list ul > li');
					if(listItem.length){
						setTimeout(function(){
							listItem.each(function(i, e){
								setTimeout(function(){
									$(e).addClass('fadeInTop done');
								}, (i*100));	
							});
						}, speed+100);
					}else{
						parent.find('.fn_animated').addClass('fadeInTop done');
					}
					if(pagination){
						$([document.documentElement, document.body]).animate({
							scrollTop: parent.offset().top
						}, speed);
					}
						
					self.paginationFilter();
				},
				error: function(xhr, textStatus, errorThrown){
					console.log(errorThrown);
					console.log(textStatus);
					console.log(xhr);
				}
			});
		},
		
		categoryHook: function(){
			var self = this;
			var list = $('.wp-block-archives li, .widget_waxon_custom_categories li, .widget_categories li, .widget_archive li');
			list.each(function(){
				var item = $(this);
				if(item.find('ul').length){
					item.addClass('has-child');
				}
			});
			
			
			var html = $('.waxon_fn_hidden.more_cats').html();
			var cats = $('.widget_categories,.widget_archive,.widget_waxon_custom_categories');
			if(cats.length){
				cats.each(function(){
					var element = $(this);
					var limit	= 3;
					element.append(html);
					var li = element.find('ul:not(.children) > li');
					if(li.length > limit){
						var h = 0;
						li.each(function(i,e){
							if(i < limit){
								h += $(e).outerHeight(true,true);
							}else{
								return false;
							}
						});
						element.find('ul:not(.children)').css({height: h + 'px'});
						element.find('.waxon_fn_more_categories .fn_count').html('('+(li.length-limit)+')');
					}else{
						element.addClass('all_active');
					}
				});
				self.categoryHookAction();
			}
		},
		
		categoryHookAction: function(){
			var self			= this;
			$('.waxon_fn_more_categories').find('a').off().on('click',function(){
				var e 			= $(this);
				var limit		= 3;
				var myLimit		= limit;
				var parent 		= e.closest('.widget_block');
				var li 			= parent.find('ul:not(.children) > li');
				var liHeight	= li.outerHeight(true,true);
				var h			= liHeight*limit;
				var liLength	= li.length;
				var speed		= (liLength-limit)*50;
				e.toggleClass('show');
				if(e.hasClass('show')){
					myLimit		= liLength;
					h			= liHeight*liLength;
					e.find('.text').html(e.data('less'));
					e.find('.fn_count').html('');
				}else{
					e.find('.text').html(e.data('more'));
					e.find('.fn_count').html('('+(liLength-limit)+')');
				}
				
				
				var H = 0;
				li.each(function(i,e){
					if(i < myLimit){
						H += $(e).outerHeight(true,true);
					}else{
						return false;
					}
				});
				
				speed = (speed > 300) ? speed : 300;
				speed = (speed < 1500) ? speed : 1500;
				parent.find('ul:not(.children)').animate({height:H},speed);
				
				setTimeout(function(){
					self.right_bar_height();
				},(speed+1));
				
				
				return false;
			});
		},
		
		recipe_video: function(){
			$('.waxon_fn_single_recipe .popup-youtube').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});
		},
		
		rating: function(){
			var radio 	= $('.comments-rating input[type="radio"]');
			radio.on('click',function(){
				var el 	= $(this);
				var id	= el.attr('id');
				$('.comments-rating .fn_radio').removeClass('clicked');
				$('.comments-rating .'+id).addClass('clicked');
		 	}).on('mouseenter',function(){
				var el 	= $(this);
				var id	= el.attr('id');
				$('.comments-rating .fn_radio').removeClass('hovered');
				$('.comments-rating .'+id).addClass('hovered');
		 	}).on('mouseleave',function(){
				$('.comments-rating .fn_radio').removeClass('hovered');
		 	});
		},
		
		
		
		
		
		
		
		right_bar_height: function(){
			var H		= $(window).height(),
				bar		= $('.waxon_fn_popup_sidebar'),
				inner	= bar.find('.sidebar_wrapper');
			bar.height(H + 'px');
			if($().niceScroll){
				inner.getNiceScroll().remove();
				inner.height('100%').niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #e5e5e5"
				});
			}
		},
		
		
		toTopJumper: function(){
			var totop		= $('.waxon_fn_footer .footer_totop a,a.waxon_fn_totop,.waxon_fn_footer .footer_right_totop a');
			if(totop.length){
				totop.on('click', function(e) {
					e.preventDefault();		
					$("html, body").animate(
						{ scrollTop: 0 }, 'slow');
					return false;
				});
			}
		},
		
		
		
		runPlayer: function(){
			var parent		= $('.waxon_fn_main_audio');
			var audioVideo 	= parent.find('audio,video');
			audioVideo.each(function(){
				var element = $(this);
				element.mediaelementplayer({
					// Do not forget to put a final slash (/)
					pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
					// this will allow the CDN to use Flash without restrictions
					// (by default, this is set as `sameDomain`)
					shimScriptAccess: 'always',
					success: function(mediaElement, domObject) {
						mediaElement.addEventListener('play', function() {
							parent.removeClass('fn_pause').addClass('fn_play');
						}, false);
						mediaElement.addEventListener('pause', function() {
							parent.removeClass('fn_play').addClass('fn_pause');
						}, false);
					},
				});
			});
		},
		
		newPlayer: function(){
			var parent		= $('.waxon_fn_main_audio');
			var closer 	  	= parent.find('.fn_closer');
			var audioVideo 	= parent.find('audio,video');
			var icon 		= parent.find('.podcast_icon');
			var audios		= $('.waxon_fn_audio_button');
			var playButton	= $('.waxon_fn_audio_button a');
			var self		= this;
			audioVideo.each(function(){
				var element = $(this);
				element.mediaelementplayer({
					// Do not forget to put a final slash (/)
					pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
					// this will allow the CDN to use Flash without restrictions
					// (by default, this is set as `sameDomain`)
					shimScriptAccess: 'always',
					success: function(mediaElement, domObject) {
						mediaElement.addEventListener('pause', function() {
							parent.removeClass('fn_play').addClass('fn_pause');
						}, false);
						mediaElement.addEventListener('play', function() {
							parent.removeClass('fn_pause').addClass('fn_play');
						}, false);
					},
				});
			});
			closer.off().on('click', function(){
				if(parent.hasClass('closed')){
					parent.removeClass('closed');
					closer.find('span').html(closer.attr('data-close-text'));
				}else{
					parent.addClass('closed');
					closer.find('span').html(closer.attr('data-open-text'));
				}
			});
			icon.off().on('click', function(){
				if(parent.find('audio,video').length){
					if(parent.hasClass('fn_pause')){
						parent.removeClass('fn_pause').addClass('fn_play').find('audio,video')[0].play();
					}else{
						parent.removeClass('fn_play').addClass('fn_pause').find('audio,video')[0].pause();
					}
				}
			});
			playButton.off().on('click',function(){
				var button		= $(this);
				var wrapper		= button.parent();
				if(!wrapper.hasClass('active')){
					audios.removeClass('active fn_play fn_pause');
					wrapper.addClass('active');
				}
				if(wrapper.hasClass('fn_pause')){
					wrapper.removeClass('fn_pause').addClass('fn_play');
					parent.find('audio,video')[0].play();
				}else if(wrapper.hasClass('fn_play')){
					wrapper.removeClass('fn_play').addClass('fn_pause');
					parent.find('audio,video')[0].pause();
				}else{
					wrapper.addClass('fn_play');
					var src			= wrapper.attr('data-mp3');
					var audio	 	= '<audio controls><source src="'+src+'" type="audio/mpeg"></audio>';
					$('.waxon_fn_main_audio .audio_player').html(audio);
					self.runPlayer();
					setTimeout(function(){
						parent.find('audio,video')[0].play();
						parent.removeClass('fn_pause').addClass('fn_play');
						parent.removeClass('closed');
						closer.find('span').html(closer.attr('data-close-text'));
						self.playerSpace();
					},50);
				}
				
				return false;
			});
		},
		
		
		widget__pages: function(){
			var nav 						= $('.widget_pages ul');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.children');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.children').slideUp(500);}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown(500);


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp(500);
						}
						return false;
					}
				});
			});
		},
		
		submenu__Mobile: function(){
			var nav 						= $('ul.vert_menu_list, .widget_nav_menu ul.menu');
			var mobileAutoCollapse			= $('.waxon-fn-wrapper').data('mobile-autocollapse');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.sub-menu');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.sub-menu').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
					if(mobileAutoCollapse === 'enable'){
						if(nav.parent().parent().hasClass('opened')){
							nav.parent().parent().removeClass('opened');
							$('.waxon_fn_mobilemenu_wrap .hamburger').removeClass('is-active');
						}
					}
				});
			});
		},
		
		hamburgerOpener__Mobile: function(){
			var hamburger		= $('.waxon_fn_mobilemenu_wrap .hamburger');
			hamburger.off().on('click',function(){
				var element 	= $(this);
				var menupart	= $('.waxon_fn_mobilemenu_wrap .mobilemenu');
				if(element.hasClass('is-active')){
					element.removeClass('is-active');
					menupart.removeClass('opened');
				}else{
					element.addClass('is-active');
					menupart.addClass('opened');
				}return false;
			});
		},
		
		like: function(){
			var svg;
			var self	= this;
			if($('.waxon-fn-wrapper').length){
				svg = $('.waxon-fn-wrapper').data('like-url');
			}
			var ajaxRunningForLike = false;
			$('.waxon_fn_like').off().on('click', function(e) {
				e.preventDefault();

				var likeLink 		= $(this),
					ID 				= $(this).data('id'),
					likeAction,addAction;
				
				likeLink 			= $('.waxon_fn_like[data-id="'+ID+'"]');

				if(ajaxRunningForLike === true) {return false;}
				
				if(likeLink.hasClass('liked')){
					likeAction 		= 'liked';
					addAction		= 'not-rated';
				}else{
					likeAction 		= 'not-rated';
					addAction		= 'liked';
				}
				ajaxRunningForLike 	= true;
				
				var requestData 	= {
					action: 'waxon_fn_like', 
					ID: ID,
					likeAction: likeAction
				};
				
				$.ajax({
					type: 'POST',
					url: fn_ajax_object.fn_ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						var fnQueriedObj 	= $.parseJSON(data); //get the data object
						likeLink.removeClass('animate ' + likeAction).addClass(addAction);
						likeLink.find('.fn__svg').remove();
						likeLink.find('.waxon_fn_like_count').before('<img src="'+fnQueriedObj.svg+'" class="fn__svg" alt="" />');
						self.imgToSVG();
						likeLink.find('.count').html(fnQueriedObj.count);
						likeLink.find('.text').html(fnQueriedObj.like_text);
						likeLink.attr('title',fnQueriedObj.title);
						likeLink.addClass('animate');
						ajaxRunningForLike = false;
					},
					error: function(MLHttpRequest, textStatus, errorThrown) {
						console.log(MLHttpRequest);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});	

				return false;
			});
		},
		
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
		
		dataFnBgImg: function(){
			var bgImage 	= $('*[data-fn-bg-img]');
			bgImage.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var bgImg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready').css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		isotopeMasonry: function(){
			var masonry = $('.waxon_fn_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
						itemSelector: '.waxon_fn_masonry_in',
						masonry: {}
					});
				});
			}
		},
		
		estimateWidgetHeight: function(){
			var est 	= $('.waxon_fn_widget_estimate');
			est.each(function(){
				var el 	= $(this);
				var h1 	= el.find('.helper1');
				var h2 	= el.find('.helper2');
				var h3 	= el.find('.helper3');
				var h4 	= el.find('.helper4');
				var h5 	= el.find('.helper5');
				var h6 	= el.find('.helper6');
				var eW 	= el.outerWidth();
				var w1 	= Math.floor((eW * 80) / 300);
				var w2 	= eW-w1;
				var e1 	= Math.floor((w1 * 55) / 80);
				h1.css({borderLeftWidth:	w1+'px', borderTopWidth: e1+'px'});
				h2.css({borderRightWidth:	w2+'px', borderTopWidth: e1+'px'});
				h3.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h4.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
				h5.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h6.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
			});
		},
    };
	
	
	
	// ready functions
	$(document).ready(function(){
		WaxonInit.init();
	});
	
	// resize functions
	$(window).on('resize',function(e){
		e.preventDefault();
		WaxonInit.menuScroll();
		WaxonInit.isotopeMasonry();
		WaxonInit.projectCategoryFitler();
		WaxonInit.right_bar_height();
		WaxonInit.estimateWidgetHeight();
	});
	
	// scroll functions
	$(window).on('scroll', function(e) {
		e.preventDefault();
		WaxonInit.fixedTotopScroll();
		WaxonInit.progress_line();
    });
	
	// load functions
	$(window).on('load', function(e) {
		e.preventDefault();
		// since v1.0
		WaxonInit.runPreloader();
		WaxonInit.preloader();
		
		WaxonInit.totopFeelIt();
		
		WaxonInit.isotopeMasonry();
		WaxonInit.projectCategoryFitler();
		setTimeout(function(){
			WaxonInit.isotopeMasonry();
			WaxonInit.projectCategoryFitler();
		},100);
	});
	
})(jQuery);