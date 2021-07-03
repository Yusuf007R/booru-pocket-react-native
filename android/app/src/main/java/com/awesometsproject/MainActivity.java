package com.awesometsproject;

import com.facebook.react.ReactActivity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
public class MainActivity extends ReactActivity {

  
@Override
protected void onCreate(Bundle savedInstanceState) {
    Window w = getWindow();
    w.setStatusBarColor(Color.TRANSPARENT);
    w.setNavigationBarColor(Color.TRANSPARENT);
    w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
    super.onCreate(savedInstanceState);
}
  @Override
  protected String getMainComponentName() {
    return "AwesomeTSProject";
  }
}
