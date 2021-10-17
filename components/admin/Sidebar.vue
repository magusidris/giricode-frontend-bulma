<template>
	<aside class="sidebar aside sidebar-page is-placed-left is-expanded">
		<div is-main-menu="true" class="aside-tools">
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
		    			<i class="mdi mdi-desktop-mac default"></i>		    			
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
		    			<i class="mdi mdi-tag-multiple default"></i>	
		    		</span>
		    		Tags
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-categories'}">
		    		<span class="icon">
		    			<i class="mdi mdi-folder-multiple default"></i>	
		    		</span>
			    	Kategori
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-blogs'}">
		    		<span class="icon">
		    			<i class="mdi mdi-book-open default"></i>	
		    		</span>
		    		Blog
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
		    			<i class="mdi mdi-select-multiple default"></i>	
		    		</span>
		    		Menu
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-sliders'}">
		    		<span class="icon">
		    			<i class="mdi mdi-folder-multiple-image default"></i>	
		    		</span>
		    		Slider
		    	</nuxt-link>
		    </li>
		    <li>
		    	<nuxt-link :to="{name: 'admin-users'}">
		    		<span class="icon">
		    			<i class="mdi mdi-account-multiple default"></i>	
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