package com.boorupocket;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;
public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "booruPOCKET";
  }


  @Override
public void onConfigurationChanged(Configuration newConfig) {
  super.onConfigurationChanged(newConfig);
  getReactInstanceManager().onConfigurationChanged(this, newConfig);
}
}
