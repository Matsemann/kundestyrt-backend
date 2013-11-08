(function($, undefined) {
	$(function() {
		var body = $(document.body);

		body.on('focusin', 'input,textarea', function() {
		console.log('I\'m a friggin log');
			body.addClass('keyboard-active');
		}).on('focusout', 'input,textarea', function() {
			body.removeClass('keyboard-active');
		});
	});
})(jQuery);