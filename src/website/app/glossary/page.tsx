import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Credit Glossary | Credit Terms Explained",
  description:
    "Comprehensive glossary of credit terms and definitions. Understand credit scores, credit reports, and credit repair terminology.",
  keywords: [
    "credit glossary",
    "credit terms",
    "credit definitions",
    "credit vocabulary",
    "credit repair terms",
  ],
};

const glossaryTerms = [
  { term: "Account in Good Standing", definition: "A credit account that is current and has no late payments or negative marks. Accounts in good standing positively impact your credit score." },
  { term: "Adverse Action", definition: "A negative decision by a lender, such as denying credit, reducing a credit limit, or increasing an interest rate based on information in your credit report. Lenders must provide an adverse action notice explaining the decision." },
  { term: "Annual Percentage Rate (APR)", definition: "The yearly interest rate charged on outstanding credit card balances or loans, expressed as a percentage. APR includes interest and certain fees, making it useful for comparing different credit offers." },
  { term: "Authorized User", definition: "A person added to someone else's credit card account who can use the card but is not legally responsible for the debt. The account may appear on the authorized user's credit report, potentially helping build credit." },
  { term: "Balance", definition: "The total amount of money owed on a credit account at any given time. This includes purchases, fees, and interest charges minus payments made." },
  { term: "Bankruptcy", definition: "A legal process that allows individuals or businesses to eliminate or repay debts under court protection. Chapter 7 bankruptcy stays on credit reports for 10 years; Chapter 13 stays for 7 years." },
  { term: "Charge-Off", definition: "When a creditor writes off a debt as uncollectible, usually after 180 days of non-payment. The debt is still owed and typically sold to a collection agency. Charge-offs severely damage credit scores." },
  { term: "Collection Account", definition: "A debt that has been transferred to a collection agency for recovery. Collections are reported separately on credit reports and significantly hurt credit scores." },
  { term: "Credit Bureau", definition: "A company that collects and maintains consumer credit information, then provides credit reports to lenders. The three major bureaus are Experian, Equifax, and TransUnion." },
  { term: "Credit History", definition: "A record of how you have managed credit over time, including accounts opened, balances, payment history, and credit inquiries. Longer positive history generally helps your score." },
  { term: "Credit Inquiry", definition: "A request to view your credit report. Hard inquiries (from credit applications) can affect your score; soft inquiries (from you or prescreened offers) do not." },
  { term: "Credit Limit", definition: "The maximum amount you can borrow on a revolving credit account like a credit card. Also called a credit line." },
  { term: "Credit Mix", definition: "The variety of credit account types you have, such as credit cards, mortgages, auto loans, and personal loans. Having different types can help your score (10% of FICO score)." },
  { term: "Credit Report", definition: "A detailed record of your credit history compiled by a credit bureau. It includes personal information, account history, public records, and credit inquiries." },
  { term: "Credit Score", definition: "A three-digit number (typically 300-850) that represents your creditworthiness based on your credit report. Higher scores indicate lower risk to lenders." },
  { term: "Credit Utilization Ratio", definition: "The percentage of available credit you are using, calculated by dividing your total balances by total credit limits. Keeping this under 30% (ideally under 10%) helps your score." },
  { term: "Creditor", definition: "A person or company to whom money is owed. Also called a lender. Examples include credit card companies, banks, and mortgage lenders." },
  { term: "Date of First Delinquency", definition: "The date when an account first became past due and was not brought current. This date determines when negative items will age off your credit report (typically 7 years later)." },
  { term: "Debt Consolidation", definition: "Combining multiple debts into a single loan or credit account, often to get a lower interest rate or simplify payments." },
  { term: "Debt-to-Income Ratio (DTI)", definition: "A measure comparing your monthly debt payments to your monthly income. While not part of your credit score, lenders use DTI to evaluate loan applications." },
  { term: "Default", definition: "Failure to meet the terms of a credit agreement, usually by not making required payments. Defaults are seriously negative marks on credit reports." },
  { term: "Delinquency", definition: "When a payment is past due. Payments are typically reported as delinquent at 30, 60, 90, and 120+ days late." },
  { term: "Dispute", definition: "A formal challenge to information on your credit report that you believe is inaccurate, incomplete, or unverifiable. Credit bureaus must investigate disputes under the FCRA." },
  { term: "Equifax", definition: "One of the three major credit bureaus in the United States. Equifax maintains credit information on over 200 million Americans." },
  { term: "Experian", definition: "One of the three major credit bureaus in the United States. Experian is the largest, tracking over 220 million consumers." },
  { term: "Fair Credit Reporting Act (FCRA)", definition: "Federal law that regulates how credit information is collected, shared, and used. It gives consumers the right to dispute inaccurate information and access their credit reports." },
  { term: "Fair Debt Collection Practices Act (FDCPA)", definition: "Federal law that prohibits abusive, unfair, or deceptive practices by debt collectors. It gives consumers rights when dealing with collection agencies." },
  { term: "FICO Score", definition: "The most widely used credit scoring model, created by Fair Isaac Corporation. FICO scores range from 300-850 and are used by 90% of top lenders." },
  { term: "Foreclosure", definition: "The legal process by which a lender takes possession of a property when the borrower fails to make mortgage payments. Foreclosures stay on credit reports for 7 years." },
  { term: "Fraud Alert", definition: "A notice placed on your credit report that warns lenders to verify your identity before issuing credit. Fraud alerts help prevent identity theft." },
  { term: "Goodwill Adjustment", definition: "When a creditor agrees to remove a late payment or other negative mark from your credit report as a courtesy, even though the information is accurate. Success depends on the creditor's policies." },
  { term: "Grace Period", definition: "The time between the end of a billing cycle and the payment due date during which you can pay your balance in full without incurring interest charges." },
  { term: "Hard Inquiry", definition: "A credit check initiated when you apply for credit. Hard inquiries can lower your score by a few points and stay on your report for 2 years (affecting score for 12 months)." },
  { term: "Identity Theft", definition: "When someone uses your personal information without permission to commit fraud, such as opening accounts in your name. Victims have special rights under the FCRA." },
  { term: "Installment Loan", definition: "A loan repaid in fixed payments over a set period. Examples include auto loans, mortgages, student loans, and personal loans." },
  { term: "Interest Rate", definition: "The cost of borrowing money, expressed as a percentage of the loan amount. Interest rates vary based on credit scores, loan types, and market conditions." },
  { term: "Judgment", definition: "A court ruling that you owe a debt. While judgments are no longer included in credit reports as of 2017, they can still affect your ability to get credit." },
  { term: "Late Payment", definition: "A payment received after the due date. Late payments are typically reported to credit bureaus at 30, 60, 90, and 120+ days past due." },
  { term: "Lien", definition: "A legal claim against property as security for a debt. Tax liens were removed from credit reports in 2018 but still affect property ownership." },
  { term: "Minimum Payment", definition: "The smallest amount you must pay on a credit account to keep it current. Paying only the minimum results in significant interest charges over time." },
  { term: "Negative Item", definition: "Any information on your credit report that hurts your score, such as late payments, collections, charge-offs, or bankruptcies." },
  { term: "Pay for Delete", definition: "An agreement where a creditor or collector agrees to remove a negative item from your credit report in exchange for payment. Not all creditors will agree to this." },
  { term: "Payment History", definition: "A record of whether you have paid your credit accounts on time. Payment history is the most important factor in your credit score (35% of FICO score)." },
  { term: "Prepaid Card", definition: "A card loaded with a set amount of money that decreases as you make purchases. Prepaid cards do not build credit because they do not involve borrowing." },
  { term: "Public Record", definition: "Legal information from court records, such as bankruptcies. Civil judgments and tax liens are no longer included in credit reports." },
  { term: "Repossession", definition: "When a lender takes back property (usually a vehicle) due to missed payments. Repossessions stay on credit reports for 7 years." },
  { term: "Revolving Credit", definition: "Credit that allows you to borrow repeatedly up to a limit, repay, and borrow again. Credit cards are the most common form of revolving credit." },
  { term: "Secured Credit Card", definition: "A credit card backed by a cash deposit that serves as collateral and typically becomes your credit limit. Secured cards help people build or rebuild credit." },
  { term: "Security Freeze", definition: "A lock on your credit file that prevents new creditors from accessing your credit report, making it harder for identity thieves to open accounts in your name." },
  { term: "Soft Inquiry", definition: "A credit check that does not affect your credit score, such as checking your own credit, prescreened offers, or background checks." },
  { term: "Statute of Limitations", definition: "The time period during which a creditor can sue you for a debt. Varies by state and debt type. Does not affect how long items stay on your credit report." },
  { term: "TransUnion", definition: "One of the three major credit bureaus in the United States. TransUnion tracks over 200 million consumers." },
  { term: "Unsecured Credit", definition: "Credit that is not backed by collateral, such as most credit cards and personal loans. Approval depends primarily on creditworthiness." },
  { term: "VantageScore", definition: "A credit scoring model created jointly by the three major credit bureaus as an alternative to FICO. Scores range from 300-850." },
];

// Group terms by first letter
const groupedTerms = glossaryTerms.reduce((acc, item) => {
  const letter = item.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(item);
  return acc;
}, {} as Record<string, typeof glossaryTerms>);

const alphabet = Object.keys(groupedTerms).sort();

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Credit Glossary
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Credit Terms Explained
            </h1>
            <p className="text-lg text-white/80">
              A comprehensive glossary of credit terminology to help you understand your
              credit reports and the credit repair process.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded bg-white text-sm font-medium hover:bg-primary hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {alphabet.map((letter) => (
              <div key={letter} id={letter} className="mb-12">
                <h2 className="mb-6 border-b pb-2 font-serif text-3xl font-bold text-primary">
                  {letter}
                </h2>
                <div className="space-y-6">
                  {groupedTerms[letter].map((item) => (
                    <div key={item.term}>
                      <h3 className="mb-2 text-lg font-semibold">{item.term}</h3>
                      <p className="text-muted-foreground">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Need Help Understanding Your Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our experts can explain your credit report in plain language and create a plan
            to improve your score.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

