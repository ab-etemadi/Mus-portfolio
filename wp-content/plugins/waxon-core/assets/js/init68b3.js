(function($, fnFrontend){
	"use strict";
	
	
	
	var MarketifyWaxon = {
		
		isAdmin: false,
		adminBarH: 0,
		
		init: function() {
			
			if($('body').hasClass('admin-bar')){
				MarketifyWaxon.isAdmin 	= true;
				MarketifyWaxon.adminBarH 	= $('#wpadminbar').height();
			}

			var widgets = {
				'frel-video-button.default' : MarketifyWaxon.magnific_popup,
				'frel-team-member.default' : MarketifyWaxon.teamMember,
				'frel-gallery.default' : MarketifyWaxon.allGalleryFunctions,
				'frel-accordion.default' : MarketifyWaxon.accordionFunction,
				'frel-partners.default' : MarketifyWaxon.partners,
				'frel-progress-bar.default' : MarketifyWaxon.progress,
				'frel-after-before.default' : MarketifyWaxon.imageAfterBefore,
				'frel-countdown.default' : MarketifyWaxon.countdown,
				'frel-circular-progress.default' : MarketifyWaxon.circularProgress,
				'frel-boxed-counter.default' : MarketifyWaxon.fn_cs_counter,
				'frel-modal-button.default' : MarketifyWaxon.modal_button,
				'frel-social-list.default' : MarketifyWaxon.ImgToSVG,
				'frel-hero-header.default' : MarketifyWaxon.hero,
				'frel-about.default' : MarketifyWaxon.about,
				'frel-services.default' : MarketifyWaxon.services,
				'frel-testimonials.default' : MarketifyWaxon.testimonials,
			};

			$.each( widgets, function( widget, callback ) {
				fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
		},
		
		magnific_popup: function(){
			$('.gallery_zoom').each(function() { // the containers for all your galleries
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
			$('.popup-youtube').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});	
		},
		
		teamMember: function(){
			MarketifyWaxon.BgImg();
			MarketifyWaxon.ImgToSVG();
		},
		
		simpleParallax: function(){
			$('.thumbnail').each(function(){
				 new simpleParallax($(this)[0], {
					delay:5,
					overflow: true,
					orientation:'down'
				});
			});
		},
		
		testimonials: function(){
			var carousel = $('.fn_cs_testi_carousel .owl-carousel');
			carousel.each(function(){
				$(this).owlCarousel({
					loop: true,
					items: 3,
					lazyLoad: false,
					margin: 50,
					autoplay: true,
					autoplayTimeout: 7000,
					dots: false,
					nav: false,
					navSpeed: false,
					responsive : {
						0 : {
							items: 1
						},
						768 : {
							items: 3
						}
					}
				});
			});
			
			$('.fn_cs_testimonials .rightpart li').on('mouseenter',function(){
				var element = $(this);
				MarketifyWaxon.testimonial_hover(element);
			});
			$('.fn_cs_testimonials .rightpart a').on('click',function(){
				var element = $(this).closest('li');
				MarketifyWaxon.testimonial_hover(element);
				return false;
			});
			MarketifyWaxon.BgImg();
			MarketifyWaxon.ImgToSVG();
			MarketifyWaxon.isotopeFunction();
		},
		testimonial_hover: function(element){
			if(element.hasClass('active')){
				return false;
			}
			element.siblings().removeClass('active');
			element.addClass('active');
			var index		= element.index();
			var leftpart 	= element.closest('.fn_cs_testimonials').find('.leftpart');
			leftpart.find('.active').removeClass('active');
			leftpart.find('li').eq(index).addClass('active');
		},
		
		services: function(){
			var carousel1 = $('.fn_cs_services .owl-carousel');

			var rtlMode	= false;

			if($('body').hasClass('rtl')){
				rtlMode = 'true';
			}

			carousel1.owlCarousel({
				loop: true,
				items: 2,
				lazyLoad: false,
				margin: 50,
				autoplay: true,
				autoplayTimeout: 7000,
				rtl: rtlMode,
				dots: true,
				nav: false,
				navSpeed: true,
				responsive:{
					0:{items:1},
					480:{items:1},
					768:{items:2},
					1040:{items:3}
				}
			});
			MarketifyWaxon.ImgToSVG();	
		},
		
		about: function(){
			MarketifyWaxon.modal_button();	
			MarketifyWaxon.simpleParallax();	
		},
		
		
		hero: function(){
			MarketifyWaxon.BgImg();
			var statics = $('.fn_cs_hero');
			if(statics.length){
				statics.each(function(){
					var element = $(this);
					setTimeout(function(){
						element.find('.my_overlay').addClass('loaded');
					}, 2000);
				});
			}
			$(".fn_cs_hero .glitch").each(function(){
				$(this).mgGlitch({
					destroy: false,
					glitch: true,
					scale: true,
					blend: true,
					blendModeType: "hue",
					glitch1TimeMin: 200,
					glitch1TimeMax: 400,
					glitch2TimeMin: 10,
					glitch2TimeMax: 100
				});
			});
			$('.fn_cs_hero .overlay_slider').each(function(){
				var element = $(this);
				var html	= []; 
				var items	= element.find('.k_item');
				items.each(function(){
					 html.push({src:$(this).val()});
				});
				element.vegas({
					timer:false,	
					animation: [ 'kenburnsUp', 'kenburnsLeft', 'kenburnsRight'],
					delay:7000,
					slides: html
				});
			});
			
			
			// slider
			var section		= $('.fn_cs_personal_slider');
			section.each(function(){
				var element				= $(this);
				var mainSliderSelector	= element.find('.swiper-container');
				var transform 			= 'Y';
				var direction 			= 'horizontal';
				var	interleaveOffset 	= 0.5;
				if(direction === 'horizontal'){
					transform 			= 'X';
				}
				// Main Slider
				var mainSliderOptions 	= {
					loop: true,
					speed: 1500,
					autoplay:{
						delay: 5000
					},
					slidesPerView: 1,
					direction: direction,
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					on: {
						init: function(){
							this.autoplay.stop();
						},
						imagesReady: function(){
							this.autoplay.start();
						},
						progress: function(){
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress 	= swiper.slides[i].progress,
								innerOffset 		= swiper.width * interleaveOffset,
								innerTranslate 		= slideProgress * innerOffset;
								$(swiper.slides[i]).find(".main_image").css({transform: "translate"+transform+"(" + innerTranslate + "px)"});
							}
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector(".main_image").style.transition =
								speed + "ms";
							}
						}
					}
				};
				new Swiper(mainSliderSelector, mainSliderOptions);
			});
		},
		
		modal_button: function(){
			$('.fn_cs_modal_button a,.fn__modal_button').off().on('click',function(){
				var m = 'waxon_fn_modalbox';
				if(!$('.'+m).length){
					$('body').append('<div class="'+m+'"><div class="box_inner"><a class="fn_closer" href="#"></a><div class="modal_in"><div class="modal_content"></div></div></div></div>');
				}
				$('.'+m+' .modal_content').html('').html($('.elementor').clone());
				$('.'+m).addClass('opened');
				
				// recall all functions
				MarketifyWaxon.accordionFunction();
				MarketifyWaxon.allGalleryFunctions();
				MarketifyWaxon.partners();
				MarketifyWaxon.progress();
				MarketifyWaxon.imageAfterBefore();
				MarketifyWaxon.countdown();
				MarketifyWaxon.circularProgress();
				MarketifyWaxon.fn_cs_counter();
				MarketifyWaxon.modal_button();
				MarketifyWaxon.modal_recalc_height();
				
				// call modal closer
				MarketifyWaxon.modal_closer();
				
				return false;
			});
		},
		
		modal_closer: function(){
			$('.waxon_fn_modalbox .fn_closer').off().on('click',function(){
				$('.waxon_fn_modalbox').removeClass('opened');return false;
			});
		},
		
		modal_recalc_height: function(){
			$('.waxon_fn_modalbox .modal_content').css({height: $('.waxon_fn_modalbox .modal_in').height()}).niceScroll({
				touchbehavior:false,
				cursorwidth:0,
				autohidemode:true,
				cursorborder:"0px solid #fff"
			});
		},
		
		fn_cs_counter: function(){
			var element = $('.fn_cs_counter');
			element.each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop') || (el.closest('.elementor').parent().parent().parent().hasClass('waxon_fn_modalbox'))){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		inlineStyle: function(){
			var s = '';$('.waxon_fn_style').each(function(){var e=$(this),v=e.val();e.val('');s+=v;});$('body').append(s);
		},
		
		circularProgress: function(){
			var ww			= $(window).width();
			var circVal = 150;

			if(ww <= 768){
				circVal = 100;
			}
			
			$('.fn_cs_circular_progress .myCircle').each(function() {
				var element		= $(this);
				var value		= element.data('value');
				var fill		= element.data('active');
				var emptyFill	= element.data('inactive');
				if(element.hasClass('ready')){return false;}element.addClass('ready');
				
				
				element.waypoint({handler: function(){
					element.circleProgress({
					size: circVal,
					value: 0,
					animation: {duration: 1400},
					thickness: 7,
					fill: fill,
					emptyFill: emptyFill,
					startAngle: -Math.PI/2
				  }).on('circle-animation-progress', function(event, progress, stepValue) {
						element.find('.number').text(parseInt(stepValue.toFixed(2)*100) + '%');
				  });
				  element.circleProgress('value', value);
				},offset:'90%'});
			});
		},
		
		countdown: function(){
			$('.fn_cs_countdown').each(function(){
				var e 	= $(this),
					t 	= e.data('type'),
					dd 	= e.data('due-date');
				if(!e.hasClass('ready')){e.addClass('ready');
					if(t === 'date'){
						var countDownDate 	= new Date( dd );
						var x 				= setInterval(function() {
						  	var now 		= new Date().getTime();
						 	var distance 	= countDownDate - now;
						  	var days 		= Math.floor(distance / 86400000);
							var hours 		= Math.floor((distance % 86400000) / 3600000);
							var minutes 	= Math.floor((distance % 3600000) / 60000);
						  	var seconds 	= Math.floor((distance % 60000) / 1000);
							if(parseInt(days) === 0){
								e.find('.day_item').addClass('expired');
							}
							days			= (days < 10 && days > 0) ? '0' + days : days;
							hours			= (hours < 10 && hours > 0) ? '0' + hours : hours;
							minutes 		= (minutes < 10 && minutes > 0) ? '0' + minutes : minutes;
							seconds 		= (seconds < 10 && seconds > 0) ? '0' + seconds : seconds;
							e.find('.day_item h3').text(days);
							e.find('.hour_item h3').text(hours);
							e.find('.minute_item h3').text(minutes);
							e.find('.second_item h3').text(seconds);

						  	// If the count down is finished, write some text
							if (distance < 0) {
//								clearInterval(x);
							}
						}, 1000);
					}else if(t === 'ever'){
						var ever 			= e.data('ever');
						var y 				= setInterval(function(){
							var days 		= Math.floor(ever / 86400);
							var hours 		= Math.floor((ever % 86400) / 3600);
							var minutes 	= Math.floor((ever % 3600) / 60);
							var seconds 	= Math.floor((ever % 60));
							if(days === 0){
								e.find('.day_item').addClass('expired');
							}
							days			= (days < 10) ? '0' + days : days;
							hours			= (hours < 10) ? '0' + hours : hours;
							minutes 		= (minutes < 10) ? '0' + minutes : minutes;
							seconds 		= (seconds < 10) ? '0' + seconds : seconds;
							e.find('.day_item h3').text(days);
							e.find('.hour_item h3').text(hours);
							e.find('.minute_item h3').text(minutes);
							e.find('.second_item h3').text(seconds);
							ever			= ever - 1;
							if(ever < 0){
//								clearInterval(y);
							}
						}, 1000);
					}
				}
					
			});
		},
		
		
		imageAfterBefore: function(){
			$('.fn_cs_after_before').each(function(){
				var count 		= 0;
				var wrapper		= $(this);
				var container	= wrapper.find('.compare_container');
				var firstImage	= container.find('img:nth-child(1)');
				var firstURL	= firstImage.attr('src');
				var secondImage	= container.find('img:nth-child(2)');
				var secondURL	= secondImage.attr('src');
				firstImage.attr('src', firstURL).load(function() {
					count++;
					MarketifyWaxon.checkItForImageAfterBefore(count,wrapper);
				});
				secondImage.attr('src', secondURL).load(function() {
					count++;
					MarketifyWaxon.checkItForImageAfterBefore(count,wrapper);
				});
			});
		},
		
		checkItForImageAfterBefore: function(count,wrapper){
			if(count === 2){
				var ID 			= MarketifyWaxon.ID(),
					container 	= wrapper.find('.compare_container'),
					href1 		= container.find('img:nth-child(1)').attr('src'),
					href2 		= container.find('img:nth-child(2)').attr('src'),
					label1 		= container.data('label1'),
					label2 		= container.data('label2');
				container.parent().html('').attr('id',ID);
				var slider  	= new juxtapose.JXSlider('#'+ID,
					[
						{
							src: href1,
							label: label1,
							credit: 'Image Credit'
						},
						{
							src: href2,
							label: label2,
							credit: "Image Credit"
						}
					],
					{
						animate: true,
						showLabels: true,
						showCredits: true,
						startingPosition: "50%",
						makeResponsive: true
					});
			}
		},
		
		ID: function () {
		  // Math.random should be unique because of its seeding algorithm.
		  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
		  // after the decimal.
		  return 'frenify_' + Math.random().toString(36).substr(2, 9);
		},
		
		swiper: function(){
		  	MarketifyWaxon.BgImg();
			$('.fn_cs_testimonials .r_list, .fn_cs_triple_portfolio .r_list').each(function(){
				if($(this).hasClass('gogogo')){return false;}$(this).addClass('gogogo');
				var element 	= $(this);
				var container 	= element.find('.swiper-container');
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 45,
					speed: 1000,
					loopAdditionalSlides: 10,
					autoplay: {
						delay: 7000
					},
					on: {
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
						slideChange: function () {
							MarketifyWaxon.ImgToSVG();
							MarketifyWaxon.teamMemberPopup();
						},
					},
					pagination: {
						el: '.fn_cs_swiper__progress',
						type: 'custom', // progressbar
						renderCustom: function (swiper,current,total) {

							// opacity 
							var index 		= current - 1;
							var activeSlide = container.find('.swiper-slide[data-swiper-slide-index="'+index+'"]');
							container.find('.r_item').removeClass('fn_vision');
							activeSlide.find('.r_item').addClass('fn_vision');
							activeSlide.next().find('.r_item').addClass('fn_vision');
							activeSlide.next().next().find('.r_item').addClass('fn_vision');



							// progress animation
							var scale,translateX;
							var progressDOM	= container.find('.fn_cs_swiper__progress');
							if(progressDOM.hasClass('fill')){
								translateX 	= '0px';
								scale		= parseInt((current/total)*100)/100;
							}else{
								scale 		= parseInt((1/total)*100)/100;
								translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
							}


							progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
							if(current<10){current = '0' + current;}
							if(total<10){total = '0' + total;}
							progressDOM.find('.current').html(current);
							progressDOM.find('.total').html(total);
						}
					},
					breakpoints: {
						0: {
							slidesPerView: 1,
							spaceBetween: 0,
						},
						700: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1200: {
							slidesPerView: 3,
							spaceBetween: 45
						}
					}
				});
			});
			MarketifyWaxon.ImgToSVG();
		},
		
		
		
		pricingFunctions: function(){
			MarketifyWaxon.ImgToSVG();
			$('.fn_cs_pricing_switcher input').on('click',function(){
				$(this).closest('.fn_cs_pricing').find('.fn_column').toggleClass('active');
			});
		},
		
		progress: function(){
			$('.fn_cs_progress_wrap').each(function() {
				var pWrap 	= $(this);
				pWrap.waypoint({handler: function(){MarketifyWaxon.progressF(pWrap);},offset:'90%'});
			});	
		},
		
		progressF: function(container){
			container.find('.fn_cs_progress').each(function(i) {
				var progress 	= $(this);
				var pValue 		= parseInt(progress.data('value'));
				var pBarWrap 	= progress.find('.fn_cs_bar_wrap');
				var pBar 		= progress.find('.fn_cs_bar');
				var number 		= progress.find('.number');
				pBar.css({width:pValue+'%'});
				
				
				jQuery({ Counter: 0 }).animate({ Counter: pValue }, {
					duration: 2200,
					easing: 'swing',
					step: function () {
						number.text(this.Counter.toFixed(0) + '%');
					}
				});
				
				
				setTimeout(function(){pBarWrap.addClass('open');},(i*500));
			});	
		},
		
		partners: function(){
			var carousel 	= $('.fn_cs_partners .owl-carousel');
			var rtlMode		= false;
			if($('body').hasClass('rtl')){
				rtlMode		= true;
			}
			carousel.each(function(){
				$(this).owlCarousel({
					loop: true,
					rtl: rtlMode,
					items: 4,
					autoWidth: false,
					lazyLoad: true,
					margin: 50,
					autoplay: true,
					autoplayTimeout: 4000,
					smartSpeed: 2000,
					dots: false,
					nav: false,
					navSpeed: true,
					responsive:{
						0:{items:1},
						480:{items:1},
						768:{items:2},
						1040:{items:3},
						1200:{items:3},
						1600:{items:4},
						1920:{items:4}
					}
				});	
			});
			
			var carousel2			= $('.fn_cs_partners_beta .owl-carousel');
		
			carousel2.owlCarousel({
				loop: true,
				items: 4,
				lazyLoad: false,
				margin: 100,
				autoplay: true,
				autoplayTimeout: 7000,
				rtl: rtlMode,
				dots: true,
				nav: false,
				navSpeed: true,
				responsive:{
					0:{items:1},
					480:{items:1},
					768:{items:2},
					1040:{items:3},
					1200:{items:3},
					1600:{items:4},
					1920:{items:4}
				}
		});
			
		},
		
		
		
		accordionFunction: function(){
			var head 	= $('.fn_cs_accordion .acc_head'),
				s		= 300,
				a		= 'swing';
			head.off().on('click',function(){
				var e 	= $(this),
					p 	= e.closest('.fn_cs_accordion'),
					c 	= e.closest('.accordion_in'),
					t	= p.data('type');
				if(!c.hasClass('acc_active')){
					if(t === 'accordion'){
						p.find('.acc_active').removeClass('acc_active').find('.acc_content').slideUp({duration:s,easing:a});
					}
					c.addClass('acc_active').find('.acc_content').slideDown({duration:s,easing:a});
				}else{
					c.removeClass('acc_active').find('.acc_content').slideUp({duration:s,easing:a});
				}
			});
		},
		
		
		
		allGalleryFunctions: function(){
			MarketifyWaxon.lightGallery();
			MarketifyWaxon.justifiedGallery();
			MarketifyWaxon.galleryMasonry();
			MarketifyWaxon.BgImg();
			MarketifyWaxon.gallerySlider();
			MarketifyWaxon.collageCarousel();
			MarketifyWaxon.isotopeFunction();
			MarketifyWaxon.inlineStyle();
			setTimeout(function(){
				MarketifyWaxon.isotopeFunction();
			},2000);
		},
		
		collageCarousel: function(){
			var carousel 	= $('.fn_cs_gallery_collage_a .owl-carousel');
			var rtlMode		= false;
			if($('body').hasClass('rtl')){
				rtlMode		= true;
			}
			
			carousel.each(function(){
				var e		= $(this);
				var myNav	= false;
				var gutter	= parseInt(e.closest('.fn_cs_gallery_collage_a').data('gutter'));
				
				e.owlCarousel({
					items: 4,
					lazyLoad: true,
					loop:true,
					rtl: rtlMode,
					animateOut: 'fadeOut',
					animateIn: 'fadeIn',
					autoWidth:true,
					autoplay: true,
					autoplayTimeout: 70000,
					smartSpeed: 2000,
					margin: gutter,
					dots: true,
					nav: myNav,
					navSpeed: true
				});	
			});
		},
		
		gallerySlider: function(){
			$('.fn_cs_gallery_slider .inner').each(function(){
				var element 	= $(this);
				if(element.hasClass('gogogo')){
					return false;
				}element.addClass('gogogo');
				var container 	= element.find('.swiper-container');
				
				
				var pagination		= element.closest('.fn_cs_gallery_slider').data('pag');
				var paginationClass = 'fn_cs_swiper__progress';
				var type 			= 'custom';
				var clickable		= false;
				if(pagination === 'dots'){
					paginationClass = 'fn_cs_swiper__dots';
					type 			= 'bullets';
					clickable 		= true;
				}
				
				
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 1,
					spaceBetween: 70,
					loopAdditionalSlides: 50,
					speed: 800,
					autoplay: {
						delay: 8000,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
				  	},
					on: {
						init: function(){
							element.closest('.fn_cs_gallery_slider').addClass('ready');
						},
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
				  	},
					pagination: {
						el: '.'+paginationClass,
						type: type, // progressbar
						clickable: clickable,
						renderCustom: function (swiper,current,total) {
							if(pagination === 'fill' || pagination === 'scrollbar'){
								// progress animation
								var scale,translateX;
								var progressDOM	= container.find('.fn_cs_swiper__progress');
								if(progressDOM.hasClass('fill')){
									translateX 	= '0px';
									scale		= parseInt((current/total)*100)/100;
								}else{
									scale 		= parseInt((1/total)*100)/100;
									translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
								}


								progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
								if(current<10){current = '0' + current;}
								if(total<10){total = '0' + total;}
								progressDOM.find('.current').html(current);
								progressDOM.find('.total').html(total);
							}
						},
						renderBullet: function (index, className) {
							return '<span class="' + className + ' fn_dots"></span>';
					  	}
				  	},
			  	});
			});
			MarketifyWaxon.BgImg();
		},
		
		galleryMasonry: function(){
			MarketifyWaxon.lightGallery();
			MarketifyWaxon.isotopeFunction();
		},
		
		justifiedGallery: function(){
			MarketifyWaxon.lightGallery();
			var justified = $(".fn_cs_gallery_justified");
			justified.each(function(){
				var element 	= $(this);
				var height		= parseInt(element.attr('data-height'));
				var gutter		= parseInt(element.attr('data-gutter'));
				if(!height || height === 0){height = 400;}
				if(!gutter || gutter === 0){gutter = 10;}
				if($().justifiedGallery){
					element.justifiedGallery({
						rowHeight : height,
						lastRow : 'nojustify',
						margins : gutter,
						refreshTime: 500,
						refreshSensitivity: 0,
						maxRowHeight: null,
						border: 0,
						captions: false,
						randomize: false
					});
				}
			});
		},
		
		
		/* COMMMON FUNCTIONS */
		BgImg: function(){
			var div = $('*[data-fn-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var dataBg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('frenify-ready');
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
			var div2 = $('*[data-img]');
			div2.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-img');
				var dataBg	= element.data('img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
		
		ImgToSVG: function(){
			
			$('img.fn__svg').each(function(){
				var $img 		= $(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');

				$.get(imgURL, function(data) {
					var $svg = $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					$img.replaceWith($svg);

				}, 'xml');

			});
		},
		
		jarallaxEffect: function(){
			$('.jarallax').each(function(){
				var element			= $(this);
				var	customSpeed		= element.data('speed');

				if(customSpeed !== "undefined" && customSpeed !== ""){
					customSpeed = customSpeed;
				}else{
					customSpeed 	= 0.5;
				}
				element.jarallax({
					speed: customSpeed,
					automaticResize: true
				});
			});
		},
		isotopeFunction: function(){
			var masonry = $('.fn_cs_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  itemSelector: '.fn_cs_masonry_in',
					  masonry: {}
					});
					$(this).isotope( 'reloadItems' ).isotope();
				});
			}
			var items = $('.fn_cs_project_category .posts_list');
			if($().isotope){
				items.each(function() {
					$(this).isotope({
					  itemSelector: 'li',
					  masonry: {}
					});
				});
			}
		},
		
		lightGallery: function(){
			if($().lightGallery){
				// FIRST WE SHOULD DESTROY LIGHTBOX FOR NEW SET OF IMAGES
				var gallery = $('.fn_cs_lightgallery');

				gallery.each(function(){
					var element = $(this);
					element.lightGallery(); // binding
					if(element.length){element.data('lightGallery').destroy(true); }// destroying
					$(this).lightGallery({
						selector: ".lightbox",
						thumbnail: 1,
						loadYoutubeThumbnail: !1,
						loadVimeoThumbnail: !1,
						showThumbByDefault: !1,
						mode: "lg-fade",
						download:!1,
						getCaptionFromTitleOrAlt:!1,
					});
				});
			}	
		},
	};
	
	$( window ).on( 'elementor/frontend/init', MarketifyWaxon.init );
	
	
	$( window ).on('resize',function(){
		MarketifyWaxon.modal_recalc_height();
		MarketifyWaxon.isotopeFunction();
		setTimeout(function(){
			MarketifyWaxon.isotopeFunction();
		},700);
	});
	$( window ).on('load',function(){
		MarketifyWaxon.isotopeFunction();
	});
	
	$(window).on('scroll',function(){
		
	});
	
})(jQuery, window.elementorFrontend);