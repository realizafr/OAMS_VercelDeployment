import java.awt.Desktop;
import java.io.File;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class ShowDocs {
    /**
     * Opens the folder for the given applicationId in backend/uploads/[application_id].
     * @param parent The parent frame (for dialog positioning).
     * @param applicationId The application ID.
     */
    public static void openDocumentsFolder(JFrame parent, String applicationId) {
        File folder = new File("../backend/uploads/" + applicationId);
        if (folder.exists() && folder.isDirectory()) {
            try {
                Desktop.getDesktop().open(folder.getCanonicalFile());
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(parent, "Error opening folder:\n" + ex.getMessage());
            }
        } else {
            JOptionPane.showMessageDialog(parent, "Document folder not found.");
        }
    }
}