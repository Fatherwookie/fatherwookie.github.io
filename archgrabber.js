import java.awt.*;
import java.awt.event.*;
import java.util.Random;
import javax.swing.*;

public class ImageDisplay extends JPanel implements ActionListener {

    private Timer timer;
    private ImageIcon[] images;
    private JLabel imageLabel;
    private int currentIndex = 0;

    public ImageDisplay() {
        setPreferredSize(new Dimension(400, 400));
        setBackground(Color.WHITE);
        
        // Load the images
        images = new ImageIcon[] {
            new ImageIcon("image1.jpg"),
            new ImageIcon("image2.jpg"),
            new ImageIcon("image3.jpg")
        };
        
        // Create the image label
        imageLabel = new JLabel();
        add(imageLabel);
        
        // Create and start the timer
        timer = new Timer(3000, this);
        timer.start();
    }

    public void actionPerformed(ActionEvent e) {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        imageLabel.setIcon(images[currentIndex]);
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Image Display");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().add(new ImageDisplay());
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
}
