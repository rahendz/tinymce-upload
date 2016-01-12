$(document).ready(function(){
try {
	var args = top.tinymce.activeEditor.windowManager.getParams(),
		img='', images=null, size=null, width=null, tag='',
		empty='<div class="col-xs-12 alert alert-warning text-center">'+args.emptyData+'</div>';
	$.post(
		args.finderMethod,
		{finder_media:true}
	).fail(function(resp){
		$('#insertImages').attr('disabled','disabled');
		$('#showcase').html(empty);
	}).done(function(resp){
		if($.isArray(resp)&&resp.length>0) {
			$.each(resp,function(k,url){
				img=img+'<div class="col-xs-2"><label style="background-image:url('+url+');"><input name="images" type="checkbox" value="'+url+'" /></label></div>';
			});
			$('#insertImages').removeAttr('disabled');
			$('#showcase').html(img);
		} else {
			$('#insertImages').attr('disabled','disabled');
			$('#showcase').html(empty);
		}
	});

	$('#insertImages:enabled').on('click',function(){
		images=$('#showcase').serializeObject().images;
		size=$('#imagesize').serializeObject().size;

		if(size=="small"){
			width='150';
		}
		else if(size=="medium"){
			width='300';
		}
		else if(size=="large"){
			width='600';
		}
		else{
			width='100%';
		}

		if(typeof images!="undefined"&&images.length>0){
			if($.isArray(images)){
				$.each(images,function(k,url){
					tag=tag+'<figure><img src="'+url+'" width="'+width+'" /></figure>';
				});
			}else{
				tag='<figure><img src="'+images+'" width="'+width+'" /></figure>';
			}
			top.tinymce.activeEditor.selection.setContent(tag);
		}
		top.tinymce.activeEditor.windowManager.close();
	});
} catch(e) {console.log('finder error');}
});