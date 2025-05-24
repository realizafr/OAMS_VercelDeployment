import java.awt.*;
import java.util.List;
import java.util.Map;
import javax.swing.*;

public class AdminGUI {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new ViewFrame());
    }
}

class ViewFrame extends JFrame {
    private JPanel buttonPanel;
    private JLabel statusLabel;

    public ViewFrame() {
        setTitle("Student Info");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 600);
        setLocationRelativeTo(null);

        buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridBagLayout());
        statusLabel = new JLabel(" ");

        // --- Top bar with Add Student (75%) and Refresh (25%) ---
        JPanel topBar = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridy = 0;
        gbc.insets = new Insets(0, 0, 0, 0);

        // Add Student button (75%)
        gbc.gridx = 0;
        gbc.weightx = 0.75;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        JButton addStudentButton = new JButton("Add Student");
        addStudentButton.setFont(new Font("Arial", Font.BOLD, 16));
        addStudentButton.addActionListener(e -> new AddStudent(this));
        topBar.add(addStudentButton, gbc);

        // Refresh button (25%)
        gbc.gridx = 1;
        gbc.weightx = 0.25;
        JButton refreshButton = new JButton("Refresh");
        refreshButton.setFont(new Font("Arial", Font.BOLD, 16));
        refreshButton.addActionListener(e -> {
            buttonPanel.removeAll();
            loadApplicationIdButtons();
        });
        topBar.add(refreshButton, gbc);

        JScrollPane scrollPane = new JScrollPane(buttonPanel);
        add(topBar, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        add(statusLabel, BorderLayout.SOUTH);

        loadApplicationIdButtons();

        setVisible(true);
    }

    private void loadApplicationIdButtons() {
        try {
            List<String> ids = StudentInfoDAO.getAllApplicationIds();
            if (ids.isEmpty()) {
                statusLabel.setText("No students found.");
                return;
            }
            buttonPanel.removeAll();
int maxRows = 10; // Number of rows before starting a new column (adjust as needed)
GridBagConstraints gbc = new GridBagConstraints();
gbc.insets = new Insets(10, 10, 10, 10);
gbc.fill = GridBagConstraints.NONE;
gbc.anchor = GridBagConstraints.NORTHWEST;

for (int i = 0; i < ids.size(); i++) {
    String id = ids.get(i);
    JButton btn = new JButton(id);
    btn.setPreferredSize(new Dimension(150, 50));
    btn.addActionListener(e -> showStudentInfo(id));
    gbc.gridx = i / maxRows; // column
    gbc.gridy = i % maxRows; // row
    buttonPanel.add(btn, gbc);
}
            buttonPanel.revalidate();
            buttonPanel.repaint();
        } catch (Exception ex) {
            statusLabel.setText("Error: " + ex.getMessage());
        }
    }

    private void showStudentInfo(String appId) {
        try {
            Map<String, String> info = StudentInfoDAO.getStudentInfo(appId);
            if (info != null) {
                new StudentInfoFrame(info);
            } else {
                statusLabel.setText("No student found for " + appId);
            }
        } catch (Exception ex) {
            statusLabel.setText("Error: " + ex.getMessage());
        }
    }
}

class StudentInfoFrame extends JFrame {
    public StudentInfoFrame(Map<String, String> info) {
        setTitle("Student Info: " + info.getOrDefault("application_id", ""));
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        // Back button
        JButton backButton = new JButton("← Back");
        backButton.setFont(new Font("Arial", Font.PLAIN, 16));
        backButton.setPreferredSize(new Dimension(100, 35));
        backButton.addActionListener(e -> dispose());

        // Open documents button
        JButton showDocsButton = new JButton("Verify Documents");
        showDocsButton.setFont(new Font("Arial", Font.PLAIN, 16));
        showDocsButton.setPreferredSize(new Dimension(180, 35));
        // ...existing code...
showDocsButton.addActionListener(e -> {
    VerifyDocs.showVerifyDocumentsFrame(this, info.getOrDefault("application_id", ""));
});

        // Delete button
        JButton deleteButton = new JButton("Delete");
        deleteButton.setFont(new Font("Arial", Font.PLAIN, 16));
        deleteButton.setPreferredSize(new Dimension(100, 35));
        deleteButton.addActionListener(e -> {
            boolean deleted = DeleteStudent.confirmAndDelete(this, info.getOrDefault("application_id", ""));
            if (deleted) {
                dispose();
            }
        });

       // New Show Documents button
JButton showFolderButton = new JButton("Show Documents");
showFolderButton.setFont(new Font("Arial", Font.PLAIN, 16));
showFolderButton.setPreferredSize(new Dimension(180, 35));
showFolderButton.addActionListener(e -> {
    String appId = info.getOrDefault("application_id", "");
    java.io.File folder = new java.io.File("../backend/uploads/" + appId);
    if (folder.exists() && folder.isDirectory()) {
        try {
            Desktop.getDesktop().open(folder.getCanonicalFile());
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error opening folder:\n" + ex.getMessage());
        }
    } else {
        JOptionPane.showMessageDialog(this, "Document folder not found.");
    }
});

// Panel for the two buttons in 50:50 ratio
JPanel docsPanel = new JPanel(new GridLayout(1, 2, 10, 0));
docsPanel.add(showDocsButton);
docsPanel.add(showFolderButton);

// Top panel for back, docsPanel, and delete buttons
JPanel topPanel = new JPanel(new BorderLayout());
topPanel.add(backButton, BorderLayout.WEST);
topPanel.add(deleteButton, BorderLayout.EAST);
topPanel.add(docsPanel, BorderLayout.CENTER);

        // Get column order from DB
        java.util.List<String> columnOrder = new java.util.ArrayList<>();
        try (java.sql.Connection conn = DatabaseConnection.getConnection();
             java.sql.PreparedStatement stmt = conn.prepareStatement("SELECT * FROM student_info LIMIT 1");
             java.sql.ResultSet rs = stmt.executeQuery()) {
            java.sql.ResultSetMetaData meta = rs.getMetaData();
            for (int i = 1; i <= meta.getColumnCount(); i++) {
                columnOrder.add(meta.getColumnName(i));
            }
        } catch (Exception ex) {
            columnOrder = new java.util.ArrayList<>(info.keySet());
        }

        // Define where to split between personal and academic info
        java.util.List<String> personalFields = new java.util.ArrayList<>();
        java.util.List<String> academicFields = new java.util.ArrayList<>();
        boolean academicSection = false;
        for (String col : columnOrder) {
            if (col.equalsIgnoreCase("last school attended") || col.equalsIgnoreCase("last_school_attended")) {
                academicSection = true;
            }
            if (!academicSection) {
                personalFields.add(col);
            } else {
                academicFields.add(col);
            }
        }

        // Panel for Personal Info
        JPanel personalPanel = new JPanel();
        personalPanel.setLayout(new BoxLayout(personalPanel, BoxLayout.Y_AXIS));
        JLabel personalHeader = new JLabel("Personal Info");
        personalHeader.setFont(personalHeader.getFont().deriveFont(Font.BOLD));
        personalPanel.add(personalHeader);
        personalPanel.add(Box.createVerticalStrut(8));
        for (String col : personalFields) {
            JPanel row = new JPanel(new BorderLayout());
            JLabel label = new JLabel("<html><b>" + col.replace("_", " ") + ":</b></html>");
            String val = info.getOrDefault(col, "");
            if (val == null || "null".equals(val)) val = "";
            JLabel value = new JLabel(" " + val);
            row.add(label, BorderLayout.WEST);
            row.add(value, BorderLayout.CENTER);
            personalPanel.add(row);
        }

        // Panel for Academic Info
        JPanel academicPanel = new JPanel();
        academicPanel.setLayout(new BoxLayout(academicPanel, BoxLayout.Y_AXIS));
        JLabel academicHeader = new JLabel("Academic Info");
        academicHeader.setFont(academicHeader.getFont().deriveFont(Font.BOLD));
        academicPanel.add(academicHeader);
        academicPanel.add(Box.createVerticalStrut(8));
        for (String col : academicFields) {
            JPanel row = new JPanel(new BorderLayout());
            JLabel label = new JLabel("<html><b>" + col.replace("_", " ") + ":</b></html>");
            String val = info.getOrDefault(col, "");
            if (val == null || "null".equals(val)) val = "";
            JLabel value = new JLabel(" " + val);
            row.add(label, BorderLayout.WEST);
            row.add(value, BorderLayout.CENTER);
            academicPanel.add(row);
        }

        // Main panel with two columns
        JPanel mainPanel = new JPanel(new GridLayout(1, 2, 20, 0));
        mainPanel.add(personalPanel);
        mainPanel.add(academicPanel);

        setLayout(new BorderLayout());
        add(topPanel, BorderLayout.NORTH);
        add(mainPanel, BorderLayout.CENTER);

        setSize(800, 600);
        setLocationRelativeTo(null);
        setVisible(true);
    }
}