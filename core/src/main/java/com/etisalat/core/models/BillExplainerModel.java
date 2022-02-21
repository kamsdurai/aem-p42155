package com.etisalat.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.etisalat.core.constants.AEConstants;
import com.google.gson.Gson;

@Model(adaptables = {Resource.class,
    SlingHttpServletRequest.class})

public class BillExplainerModel {

  @SlingObject
  protected Resource currentResource;

 
  /**
   * Returns report steps data JSON.
   *
   * @return
   */
  public String getStepsData() {
   final Resource stepItem = currentResource.getChild(AEConstants.PN_EXPLAINER_TAB_ITEMS);
   List<Object> stepDetails = new ArrayList<>();
   final Gson gsonObj = new Gson();
    if(null != stepItem) {
	  int count = 1;
	  for(Resource resource : stepItem.getChildren()) {		
		  setStepDataValues(resource,count++,stepDetails);	    
	  }
	 }    
		   
    return gsonObj.toJson(stepDetails);
  }
  
  /**
   * Sets steps JSON object data values
   * 
   * @param resource
   * @param resChildCount
   * @param stepDetails
   */
  private void setStepDataValues(Resource resource,int resChildCount,List<Object> stepDetails) {
	final ValueMap vm = resource.getValueMap();
	Map<String,String> stepDataMap = new HashMap<>();
    String stepCount = new StringBuilder().append("#Step-").append(resChildCount).toString();
	String stepTitle = new StringBuilder().append("<span>").append(resChildCount)
	    		         .append(".</span> ").append(vm.get(AEConstants.PN_EXPLAINER_TAB_TITLE, StringUtils.EMPTY)).toString();
	String stepContent = new StringBuilder().append("<p>").append(vm.get(AEConstants.PN_EXPLAINER_TAB_CONTENT, StringUtils.EMPTY))
		         .append("</p>").toString();
	stepDataMap.put("element", stepCount);
	stepDataMap.put(AEConstants.PN_EXPLAINER_TAB_TITLE,stepTitle);
	stepDataMap.put(AEConstants.PN_EXPLAINER_TAB_CONTENT,stepContent);
	stepDataMap.put(AEConstants.PN_EXPLAINER_TAB_PLACEMENT, 
	vm.get(AEConstants.PN_EXPLAINER_TAB_PLACEMENT, StringUtils.EMPTY));    	 
	    
	stepDetails.add(stepDataMap);  
  }

  public String getBillExplainerDAMPath() {
  	return AEConstants.BILL_EXPLAINER_DAM_PATH;
  }

}
