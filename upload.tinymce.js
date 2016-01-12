$(document).ready(function(){
	try {
		$('[role="tinymce-upload"]').on('click',function(){
			var scripts = document.getElementsByTagName('SCRIPT'),
				pluginPath = '',
				filesPath = '',
				minHeight = $(window).innerHeight(),
				uploadMethod = $(this).data('upload'),
				fileSize = typeof $(this).data('maxsize')=="undefined"?2:$this(this).data('maxsize'),
				fileTypes = typeof $(this).data('ext')=="undefined"?"*":$(this).data("ext"),
				fileMimes = typeof $(this).data("mime")=="undefined"?"image/*":$(this).data("mime"),
				multiple = (typeof $(this).data('multiple')=="undefined"||$(this).data('multiple')=='')?false:true,
				emptyData= typeof $(this).data('empty')=="undefined"?"There's no image uploaded yet!":$(this).data('empty'),
				finderMethod = $(this).data('finder');

			if(scripts && scripts.length>0) {
				for(var i in scripts) {
					if(scripts[i].src && scripts[i].src.match(/\/upload.tinymce\.js($|\?.*$)/)) {
						pluginPath = scripts[i].src.replace(/(.*)\/upload.tinymce\.js($|\?.*$)/, '$1');
						filesPath = pluginPath+'/files/';
						break;
					}
				}
			}

			$('body').css('overflow','hidden');

			if ( minHeight < 600 ) {
				wTinymce = $(window).innerWidth();
				hTinymce = $(window).innerHeight();
			} else {
				wTinymce = $(window).innerWidth()-50;
				hTinymce = $(window).innerHeight()-90;
			}

			tinymce.activeEditor.windowManager.open({
				title: 'Insert Media',
				url: filesPath+'form.html',
				multiple: multiple,
				onclose: function(e) {
					$('body').css('overflow','');
				}
			},{
				pluginPath:pluginPath,
				uploadMethod:uploadMethod,
				fileSize:fileSize,
				fileTypes:fileTypes,
				fileMimes:fileMimes,
				finderMethod:finderMethod,
				emptyData:emptyData
			});
		});
	} catch (e) { console.log('No add media'); }
});