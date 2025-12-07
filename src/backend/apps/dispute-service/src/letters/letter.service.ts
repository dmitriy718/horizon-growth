import { Injectable } from '@nestjs/common';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { format } from 'date-fns';

export interface DisputeData {
  userId: string;
  userName: string;
  userAddress: string;
  creditorName: string;
  creditorAddress?: string;
  accountNumber?: string;
  amount?: string;
  reason: string;
}

@Injectable()
export class LetterService {
  async generateLetter(data: DisputeData): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    const date = format(new Date(), 'MMMM dd, yyyy');

    const text = `
${data.userName}
${data.userAddress}

${date}

${data.creditorName}
${data.creditorAddress || 'Creditor Address'}

Re: Account Number: ${data.accountNumber || 'Unknown'}
    Amount: ${data.amount || 'Unknown'}

To Whom It May Concern:

I am writing to dispute the following information in my file. I have verified with the original creditor that this account is being reported inaccurately.

The reason for my dispute is:
${data.reason}

Please investigate this matter and correct the error as soon as possible.

Sincerely,

${data.userName}
    `;

    page.drawText(text, {
      x: 50,
      y: height - 50,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
      lineHeight: 18,
    });

    return pdfDoc.save();
  }
}
