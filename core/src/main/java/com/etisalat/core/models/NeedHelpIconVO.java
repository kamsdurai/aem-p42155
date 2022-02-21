package com.etisalat.core.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NeedHelpIconVO {

	private static final Logger LOG = LoggerFactory.getLogger(NeedHelpIconVO.class);

	private String cardTitle;
	private String cardLink;
	private String cardIcon;
	private String iconAltText;

	public NeedHelpIconVO(Resource resource, ResourceResolver resourceResolver) {

		try {
			if(StringUtils.isNotBlank(resource.getValueMap().get("cardTitle", String.class))) {
				this.cardTitle = resource.getValueMap().get("cardTitle", String.class);
			}
			if(StringUtils.isNotBlank(resource.getValueMap().get("cardLink", String.class))) {
				this.cardLink = resource.getValueMap().get("cardLink", String.class);
			}
			if(StringUtils.isNotBlank(resource.getValueMap().get("cardIcon", String.class))) {
				String iconImagePath = resource.getValueMap().get("cardIcon", String.class);
				LOG.info("\n icon Image Path : {}", iconImagePath);	
				String iconImageTitle = StringUtils.EMPTY;
				String iconImageName = StringUtils.EMPTY;
				
				if(StringUtils.isNotBlank(iconImagePath)) {
									
					Resource imageResource = resourceResolver.getResource(iconImagePath);
					if(null != imageResource) {
						iconImageName = imageResource.getName();
						Resource imageMetadaResource = resourceResolver.getResource(iconImagePath+"/jcr:content/metadata");
						/* image title is empty , set image name as title*/
						iconImageTitle = (null != imageMetadaResource) ? 
								imageMetadaResource.getValueMap().get("dc:title", String.class) : StringUtils.EMPTY;
						iconImageTitle = StringUtils.isBlank(iconImageTitle)  ? iconImageName : iconImageTitle;
						
						LOG.info("\n Icon Image Title  : {}", iconImageTitle);					
					}				
					this.iconAltText = StringUtils.isBlank(iconImageTitle) ? iconImagePath : iconImageTitle ;					
					this.cardIcon = iconImagePath;
				}
				
				
			}
		} catch (Exception e){
			LOG.info("\n BEAN ERROR : {}",e.getMessage());
		}
	}

	public String getCardTitle() {
		return cardTitle;
	}

	public void setCardTitle(String cardTitle) {
		this.cardTitle = cardTitle;
	}

	public String getCardLink() {
		return cardLink;
	}

	public void setCardLink(String cardLink) {
		this.cardLink = cardLink;
	}

	public String getCardIcon() {
		return cardIcon;
	}

	public void setCardIcon(String cardIcon) {
		this.cardIcon = cardIcon;
	}

	public String getIconAltText() {
		return iconAltText;
	}

	public void setIconAltText(String iconAltText) {
		this.iconAltText = iconAltText;
	}



}
