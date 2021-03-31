(function mobileNav() {
	const mobileNavToggle = document.querySelector('.mobile-nav-toggle')
	const mobileNav = document.querySelector('.mobile-nav')
	mobileNavToggle.addEventListener('click', () => {
		!mobileNavToggle.classList.contains('is-open') ?
			mobileNavToggle.classList.add('is-open') + mobileNav.classList.add('is-open') :
			mobileNavToggle.classList.remove('is-open') + mobileNav.classList.remove('is-open')
	})
})()
