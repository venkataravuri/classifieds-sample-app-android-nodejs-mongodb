package com.nikhu.spiderclassifieds;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by ravuri on 12-10-2014.
 */
public class GridViewAdapter extends ArrayAdapter {
    private Context context;
    private int layoutResourceId;
    private ArrayList<AdSnippet> data = new ArrayList<AdSnippet>();

    public GridViewAdapter(Context context, int layoutResourceId, ArrayList<AdSnippet> data) {
        super(context, layoutResourceId);
        this.context = context;
        this.layoutResourceId = layoutResourceId;
        this.data = data;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row = convertView;
        ViewHolder holder = null;

        if (row == null) {
            LayoutInflater inflater = ((Activity) context).getLayoutInflater();
            row = inflater.inflate(layoutResourceId, parent, false);
            holder = new ViewHolder();
            holder.imageTitle = (TextView) row.findViewById(R.id.adTitle);
            holder.image = (ImageView) row.findViewById(R.id.adThumbNailImage);
            holder.price = (TextView) row.findViewById(R.id.price);
            holder.distance = (TextView) row.findViewById(R.id.distance);
            row.setTag(holder);
        } else {
            holder = (ViewHolder) row.getTag();
        }

        AdSnippet adSnippet = data.get(position);
        holder.imageTitle.setText(adSnippet.getTitle());
        holder.image.setImageBitmap(adSnippet.getImage());
        holder.price.setText("$" + Float.toString(adSnippet.getPrice()));
        holder.distance.setText(Float.toString(adSnippet.getDistance()) + "km");
        return row;
    }

    static class ViewHolder {
        TextView imageTitle;
        ImageView image;
        TextView price;
        TextView distance;
        TextView timestamp;
        ProgressBar progress;
        int position;
    }

    @Override
    public int getCount() {
        return data.size();
    }
}
