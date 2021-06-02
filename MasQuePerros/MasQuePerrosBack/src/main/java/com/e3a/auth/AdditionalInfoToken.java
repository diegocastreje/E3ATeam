package com.e3a.auth;

import java.util.HashMap;
import java.util.Map;


import com.e3a.models.entity.User;
import com.e3a.models.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;



@Component
class AdditionalInfoToken implements TokenEnhancer {

    @Autowired
    private IUserService userService;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {

        User user = userService.findByUsername(authentication.getName());

        Map<String, Object> info = new HashMap<String, Object>();
        info.put("Additional info", "Username: ".concat(user.getUsername()));

        info.put("first_name", user.getFirst_name());
        info.put("middle_name", user.getMiddle_name());
        info.put("last_name", user.getLast_name());
        info.put("email", user.getEmail());


        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);

        return accessToken;
    }

}
