package com.etisalat.core.services;


public interface EtisalatApiService {

    /**
     * Returns a send notification service url.
     *
     * @return
     */
    String getContactUsApiUrl();
    
    /**
     * Returns a Proxy Api url.
     *
     * @return
     */
    String getProxyApiUrl();

    int getTimeOut();


}
