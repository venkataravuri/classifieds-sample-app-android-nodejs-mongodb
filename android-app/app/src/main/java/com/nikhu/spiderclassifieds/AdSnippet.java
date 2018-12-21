package com.nikhu.spiderclassifieds;

import android.graphics.Bitmap;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.Date;

/**
 * Created by ravuri on 12-10-2014.
 */
public class AdSnippet {

    int position;
    String title;
    float price;
    Date postedOn;
    float distance;
    Bitmap image;
    int views;

    public AdSnippet(int position, String title, Bitmap image, float price, float distance) {
        this.position = position;
        this.title = title;
        this.price = price;
        this.distance = distance;
        this.image = image;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Date getPostedOn() {
        return postedOn;
    }

    public void setPostedOn(Date postedOn) {
        this.postedOn = postedOn;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public Bitmap getImage() {
        return image;
    }

    public void setImage(Bitmap image) {
        this.image = image;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
