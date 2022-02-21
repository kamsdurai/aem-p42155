package com.etisalat.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.apache.sling.models.impl.ResourceTypeBasedResourcePicker;
import org.apache.sling.models.spi.ImplementationPicker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.etisalat.core.models.ArticleSearch;
import com.etisalat.core.models.GenericListPageDetails;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * JUnit test verifying the ArticleSearch
 */
@ExtendWith(AemContextExtension.class)
 class ArticleSearchImplTest {
	
	private final AemContext context = new AemContext();

	private static final String CONTENT_ROOT = "/content";
	private static final String CURRENT_PAGE = "/content/blogpost";

	private static final String TEST_PAGE_CONTAINER_ROOT = CURRENT_PAGE + "/jcr:content/root/container";
	protected static final String BLOG_SEARCH_1 = TEST_PAGE_CONTAINER_ROOT + "/blogsearch";
	protected static final String BLOG_SEARCH_2 = "/content/blogpostpage/etisalat/en/overview";
	protected static final String BLOG_SEARCH_3 = TEST_PAGE_CONTAINER_ROOT + "/blogsearch1";
	protected static final String NEWS_SEARCH_1 = TEST_PAGE_CONTAINER_ROOT + "/newssearch";
	protected static final String NEWS_SEARCH_2 = TEST_PAGE_CONTAINER_ROOT + "/newssearch1";
	protected static final String ARTICLE_PAGE_PATH = "/content/pages/test-blog1/test-blog13/jcr:content";
	
	@BeforeEach
	public void setup() throws Exception {
		context.addModelsForClasses(ArticleSearchImpl.class);
		context.load().json("/com/etisalat/core/models/ArticleSearchImplTest.json", CONTENT_ROOT);
		context.registerService(ImplementationPicker.class, new ResourceTypeBasedResourcePicker());
	}

	@Test
	void testBlogArticleListWithParentPage() {
		final int expectedSize = 4;
		final String expectedTitle = "Online Learning landscape";
		final String expectedPath = "/content/pages/test-blog1/test-blog11.html";		
		final String expectedFileReference = "/content/dam/etisalat/13.1.jpg";

		context.currentResource(BLOG_SEARCH_1);

		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		GenericListPageDetails pageDetails = articleModel.getBlogPageItems().get(0);
		int actual = articleModel.getBlogPageItems().size();
		String actualTitle = pageDetails.getTitle();
		String actualBlogTileSize = pageDetails.getTileSize();		
		assertEquals(expectedSize, actual);
		assertEquals(expectedTitle, actualTitle);
		assertEquals("6", actualBlogTileSize);
		assertEquals(expectedPath, pageDetails.getPath());		
		assertEquals(expectedFileReference,
				pageDetails.getThumbnailResource().getValueMap().get("fileReference", String.class));
	}
	
	@Test
	void testBlogArticleListWithStaticPages() {
		final int expectedSize = 2;
		final String expectedTitle = "Mobile connectivity–acrucial business tool";
		final String expectedPath = "/content/pages/test-blog1/test-blog12.html";		
		final String expectedFileReference = "/content/dam/etisalat/dss-en-1024x500_tcm313-230222.jpg";

		context.currentResource(BLOG_SEARCH_3);

		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		GenericListPageDetails pageDetails = articleModel.getBlogPageItems().get(1);
		int actual = articleModel.getBlogPageItems().size();
		String actualTitle = pageDetails.getTitle();
		String actualBlogTileSize = pageDetails.getTileSize();
		assertEquals(expectedSize, actual);
		assertEquals(expectedTitle, actualTitle);
		assertEquals("3", actualBlogTileSize);
		assertEquals(expectedPath, pageDetails.getPath());		
		assertEquals(expectedFileReference,
				pageDetails.getThumbnailResource().getValueMap().get("fileReference", String.class));
	}
	
	@Test
	void testBlogArticleVideo() {
		final String expectedPath = "/content/pages/test-blog1/test-blog14.html";
		final String expectedYoutubeUrL = "https://www.youtube.com/embed/Xwr22z1hysY";
		final String expectedBlogTileSize = "video";
		final String expectedVideoID = "2134512352";

		context.currentResource(BLOG_SEARCH_1);

		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		GenericListPageDetails pageDetails = articleModel.getBlogPageItems().get(3);
		assertEquals(expectedBlogTileSize, pageDetails.getTileSize());
		assertEquals(expectedPath, pageDetails.getPath());
		assertEquals(expectedYoutubeUrL, pageDetails.getYouTubeUrl());
		assertEquals(expectedVideoID,pageDetails.getBlogVideoID());
	}
	
	@Test
	void testArticleThumbnailResource() {
		final String expectedFileReference = "/content/dam/etisalat/dss-en-1024x500_tcm313-230222.jpg";

		context.currentResource(ARTICLE_PAGE_PATH);
		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		assertEquals(expectedFileReference,
				articleModel.getThumbnailPageResource().getValueMap().get("fileReference", String.class));
	}
	
	
	@Test
	void testNewsArticleListWithParentPage() {
		final int expectedSize = 2;
		final String expectedTitle = "Middle East Operators collaborate to support Open RAN";
		final String expectedPath = "/content/pages/test-blog1/test-news15.html";		
		final String expectedFileReference = "/content/dam/etisalat/18.1.jpg";

		context.currentResource(NEWS_SEARCH_1);

		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		GenericListPageDetails pageDetails = articleModel.getNewsPageItems().get(0);
		int actual = articleModel.getNewsPageItems().size();
		String actualTitle = pageDetails.getTitle();		
		assertEquals(expectedSize, actual);
		assertEquals(expectedTitle, actualTitle);
		assertEquals(expectedPath, pageDetails.getPath());		
		assertEquals(expectedFileReference,
				pageDetails.getThumbnailResource().getValueMap().get("fileReference", String.class));
	}
	
	@Test
	void testNewsArticleListWithStaticPages() {
		final int expectedSize = 2;
		final String expectedTitle = "Telcos and 5G are the main drivers of digital transformation";
		final String expectedPath = "/content/pages/test-blog1/test-news16.html";		
		final String expectedFileReference = "/content/dam/etisalat/95-GI-11-june-Loctcm313-236183.png";

		context.currentResource(NEWS_SEARCH_2);

		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);
		GenericListPageDetails pageDetails = articleModel.getNewsPageItems().get(1);
		int actual = articleModel.getNewsPageItems().size();
		String actualTitle = pageDetails.getTitle();
		assertEquals(expectedSize, actual);
		assertEquals(expectedTitle, actualTitle);
		assertEquals(expectedPath, pageDetails.getPath());		
		assertEquals(expectedFileReference,
				pageDetails.getThumbnailResource().getValueMap().get("fileReference", String.class));
	}
	
	@Test
	void testCategory() {
		final String expected = "etisalat:business/smb/category/business-advice-ideas";
		context.currentResource(BLOG_SEARCH_1);
		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);

		String actual = articleModel.getBusinessCategoryTag();
		assertEquals(expected, actual);
	}
	
	@Test
	void testBackLink() {
		final String expected = "/content/blogpostpage/etisalat/en.html";
		context.currentResource(BLOG_SEARCH_2);
		ArticleSearch articleModel = context.request().adaptTo(ArticleSearch.class);

		String actual = articleModel.getBackToHomeLink();
		assertEquals(expected, actual);
	}
	
}
