import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

public class RedditScraper {

    public static void main(String[] args) {
        String subredditName = "ArchitecturePorn";
        int numberOfPosts = 10;

        try {
            URL url = new URL("https://www.reddit.com/r/" + subredditName + "/top.json?sort=top&t=day&limit=" + numberOfPosts);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JSONObject jsonObject = new JSONObject(response.toString());
            JSONObject dataObject = jsonObject.getJSONObject("data");
            JSONArray childrenArray = dataObject.getJSONArray("children");

            List<String> images = new ArrayList<>();
            for (int i = 0; i < childrenArray.length(); i++) {
                JSONObject childObject = childrenArray.getJSONObject(i);
                JSONObject childDataObject = childObject.getJSONObject("data");
                if (childDataObject.getString("post_hint").equals("image")) {
                    images.add(childDataObject.getString("url"));
                }
            }

            System.out.println(images);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
