$(document).ready(function(){
try {
	var args = top.tinymce.activeEditor.windowManager.getParams();

	$('[role="upload"]').uploadFile({
		url:args.uploadMethod,
		dragDropStr:"<span>or</span><p><strong>Drop Images Here to Upload</strong></p>",
		downloadStr:"Insert into post",
		allowedTypes:args.fileTypes,
		acceptFiles:args.fileMimes,
		showProgress:true,
		showPreview:true,
		previewHeight:'50px',
		previewWidth:'50px',
		showQueueDiv:'output',
		statusBarWidth:'100%',
		dragdropWidth:'100%',
		multiple:true,
		maxFileSize:args.fileSize*1024*1024,
		sequential:true,
		sequentialCount:1,
		dragDrop: true,
		showAbort:false,
		showDone:false,
		showCancel:false,
		showError:true,
		showDownload: true,
		uploadStr: '<button role="select-images" class="btn btn-default">Select Images</button>',
		formData:{upload_media:true},
		customProgressBar: function(obj,s)
        {
            this.statusbar = $("<div class='ajax-file-upload-statusbar'></div>");
            this.thumbnail = $('<div class="ajax-file-upload-thumbnail-preview"></div>').appendTo(this.statusbar);
            this.preview = $("<img class='ajax-file-upload-preview' />").width(s.previewWidth).height(s.previewHeight).appendTo(this.thumbnail).hide();
            this.content = $('<div class="ajax-file-upload-content-preview"></div>').appendTo(this.statusbar);
            this.filename = $("<small class='ajax-file-upload-filename'></small>").appendTo(this.content);
            this.progressDiv = $("<div class='ajax-file-upload-progress progress'>").appendTo(this.content).hide();
            this.progressbar = $("<div class='ajax-file-upload-bar progress-bar'></div>").appendTo(this.progressDiv);
            this.abort = $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel = $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done = $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download = $("<div class='ajax-file-upload-insert-post'></div>").appendTo(this.statusbar);
            this.buttonInsert = $('<button class="ajax-file-upload-green btn btn-default">'+s.downloadStr+'</button>').appendTo(this.download);
            this.del = $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();
            return this;
        },
		onLoad: function() {
			var btnFile = $('button[role="select-images"]');
			btnFile.on('click',function(){
				$('input[role="input-file"]').click();
			});
		},
		onSubmit: function(files) {
			$('#tab-progress').removeClass('hide');
			$('#tab-progress a').tab('show');
		},
		onSuccess: function(files,data,xhr,pd) {
			// console.log(data);
		},
		afterUploadAll: function(obj) {
			// console.log(obj);
		},
		onError: function(files,status,errMsg,pd) {
			// console.log(files);
		},
		downloadCallback:function(files,pd) {
			var imgUrl = files.url;
			top.tinymce.activeEditor.selection.setContent('<figure><img src="'+imgUrl+'" /></figure>');
			top.tinymce.activeEditor.windowManager.close();
		}
	});
} catch(e) {console.log('upload plugin error');}
});