<template>
	<aside class="aside is-placed-left is-expanded">
		<div class="aside-tools">
			<div class="aside-tools-label">
				<span>
					<b>Admin Giricode</b>
				</span>
			</div>
		</div>
		<div class="menu is-menu-main">
		  <p class="menu-label">
		    General
		  </p>
		  <ul class="menu-list">
		    <li>
		    	<nuxt-link :to="{name: 'admin-dashboard'}">
		    		<span class="icon">
		    			<i class="fas fa-desktop"></i>
		    		</span>
		    		Dashboard
		    	</nuxt-link>
		    </li>
		  </ul>
		  <p class="menu-label">
		    CONTENT
		  </p>
		  <ul class="menu-list">
		    <li>
		    	<nuxt-link :to="{name: 'admin-tags'}">
		    		<span class="icon">
		    			<i class="fas fa-tags"></i>
		    		</span>
		    		Tags
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-categories'}">
		    		<span class="icon">
		    			<i class="fas fa-folder"></i>
		    		</span>
			    	Kategori
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-blogs'}">
		    		<span class="icon">
		    			<i class="fas fa-book-open"></i>
		    		</span>
		    		Blog
		    	</nuxt-link>
		    </li>
        <li>
		    	<nuxt-link :to="{name: 'admin-series'}">
		    		<span class="icon">
		    			<i class="fas fa-swatchbook"></i>
		    		</span>
		    		Blog Series
		    	</nuxt-link>
		    </li>
		  </ul>
		  <p class="menu-label">
		    SETTINGS
		  </p>
		  <ul class="menu-list">
		    <li>
		    	<nuxt-link :to="{name: 'admin-menus'}">
		    		<span class="icon">
		    			<i class="fab fa-elementor"></i>
		    		</span>
		    		Menu
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-sliders'}">
		    		<span class="icon">
		    			<i class="fas fa-digital-tachograph"></i>
		    		</span>
		    		Slider
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-users'}">
		    		<span class="icon">
		    			<i class="fas fa-user-friends"></i>
		    		</span>
		    		User
		    	</nuxt-link>
		    </li>
		  </ul>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
	a.nuxt-link-active {
		background: $dark-green!important;
		color: #fff!important;
	}
</style>
