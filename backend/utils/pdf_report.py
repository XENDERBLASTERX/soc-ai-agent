from fpdf import FPDF

def generate_pdf(report_data: dict, filename="incident_report.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for key, value in report_data.items():
        pdf.multi_cell(0, 8, f"{key.upper()}:\n{value}\n")

    pdf.output(filename)
    return filename
