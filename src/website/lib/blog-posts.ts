export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-improve-credit-score-fast",
    title: "How to Improve Your Credit Score Fast: 10 Proven Strategies",
    excerpt: "Discover the most effective strategies to boost your credit score quickly. Learn actionable tips from credit experts that can help you see results in as little as 30 days.",
    category: "Credit Scores",
    tags: ["credit score", "improve credit", "credit tips", "fast credit improvement"],
    author: "Horizon Credit Team",
    date: "2024-12-05",
    readTime: "5 min read",
    featured: true,
    content: `
# How to Improve Your Credit Score Fast: 10 Proven Strategies

Your credit score is one of the most important numbers in your financial life. It affects everything from the interest rates you pay on loans to whether you can rent an apartment. The good news is that there are proven strategies to improve your credit score relatively quickly.

## Understanding Your Starting Point

Before you can improve your credit score, you need to know where you stand. Get your free credit reports from all three bureaus at AnnualCreditReport.com. Review them carefully for errors, as fixing mistakes can give you an instant boost.

## 10 Proven Strategies to Boost Your Score

### 1. Pay Down Credit Card Balances

Credit utilization is 30% of your FICO score. If your credit cards are maxed out, paying them down can dramatically improve your score. Aim to keep utilization below 30%, ideally below 10%.

**Quick Tip:** Pay down your balances before your statement closing date. This is when most issuers report to the bureaus.

### 2. Become an Authorized User

Ask a family member with good credit to add you as an authorized user on their credit card. Their positive payment history can boost your score, sometimes significantly.

### 3. Dispute Credit Report Errors

According to the FTC, one in five Americans has an error on their credit report. Review your reports and dispute any inaccuracies. This can result in immediate score improvements.

### 4. Request a Credit Limit Increase

Increasing your credit limit without increasing your spending lowers your utilization ratio. Many issuers will increase your limit if you've been a good customer.

### 5. Pay Bills on Time

Payment history is 35% of your score. Set up automatic payments or reminders to ensure you never miss a due date. Even one late payment can hurt your score significantly.

### 6. Keep Old Accounts Open

The length of your credit history matters. Keep your oldest credit cards open, even if you rarely use them. Just make a small purchase occasionally to keep them active.

### 7. Diversify Your Credit Mix

Having different types of credit (cards, loans, mortgage) can help your score. If you only have credit cards, consider a small credit-builder loan.

### 8. Limit New Credit Applications

Each hard inquiry can lower your score by a few points. Only apply for credit when you truly need it, and space out applications.

### 9. Use Experian Boost

Experian Boost can add your phone, utility, and streaming service payments to your Experian report. Many people see an instant score increase.

### 10. Negotiate with Creditors

If you have late payments or collections, try negotiating with creditors for a goodwill adjustment or pay-for-delete agreement.

## How Fast Can You See Results?

Some changes can impact your score within 30 days:
- Paying down credit card balances
- Being added as an authorized user
- Having errors corrected

Other changes take longer:
- Building payment history (6-12 months)
- Aging of accounts (years)

## Take the Next Step

Improving your credit score takes time and effort, but the rewards are worth it. Lower interest rates, better loan terms, and more financial opportunities await.

If you need help identifying and fixing issues on your credit report, our credit repair experts are here to help. [Get your free credit analysis today](/signup).
    `,
  },
  {
    slug: "what-is-a-good-credit-score",
    title: "What Is a Good Credit Score? Complete Guide to Credit Score Ranges",
    excerpt: "Learn what qualifies as a good credit score, how scores are calculated, and what score you need for different types of loans and credit cards.",
    category: "Credit Scores",
    tags: ["credit score", "FICO score", "credit score ranges", "good credit"],
    author: "Horizon Credit Team",
    date: "2024-12-04",
    readTime: "4 min read",
    content: `
# What Is a Good Credit Score? Complete Guide to Credit Score Ranges

Understanding credit score ranges is essential for managing your financial health. Whether you're applying for a mortgage, car loan, or credit card, your credit score plays a crucial role in determining your eligibility and interest rates.

## Credit Score Ranges Explained

Credit scores typically range from 300 to 850. Here's how FICO categorizes them:

| Score Range | Rating | What It Means |
|-------------|--------|---------------|
| 800-850 | Exceptional | Best rates and terms available |
| 740-799 | Very Good | Above average, qualify for good rates |
| 670-739 | Good | Near or slightly above average |
| 580-669 | Fair | Below average, limited options |
| 300-579 | Poor | Difficulty getting approved |

## What Score Do You Need?

### For a Mortgage
- Conventional loans: 620 minimum, 740+ for best rates
- FHA loans: 580 minimum with 3.5% down, 500-579 with 10% down
- VA loans: No official minimum, but most lenders want 620+

### For Auto Loans
- Prime rates: 700+
- Subprime rates: 500-699
- Deep subprime: Below 500

### For Credit Cards
- Premium rewards cards: 740+
- Standard cards: 670+
- Secured cards: Any score

## How Your Score Is Calculated

FICO scores are based on five factors:
1. **Payment History (35%)** - On-time payments
2. **Credit Utilization (30%)** - Balances vs. limits
3. **Length of Credit History (15%)** - How long you've had credit
4. **Credit Mix (10%)** - Types of accounts
5. **New Credit (10%)** - Recent applications

## Improving Your Score

If your score isn't where you want it to be, there are steps you can take:
- Pay all bills on time
- Keep credit card balances low
- Don't close old accounts
- Limit new credit applications
- Check your credit reports for errors

The journey to better credit starts with understanding where you are and taking consistent action to improve.
    `,
  },
  {
    slug: "credit-utilization-ratio-explained",
    title: "Credit Utilization Ratio: The Hidden Factor Crushing Your Credit Score",
    excerpt: "Credit utilization is 30% of your FICO score. Learn what it is, how to calculate it, and the optimal utilization rate for maximum score impact.",
    category: "Credit Scores",
    tags: ["credit utilization", "credit score factors", "credit cards", "debt ratio"],
    author: "Horizon Credit Team",
    date: "2024-12-03",
    readTime: "4 min read",
    content: `
# Credit Utilization Ratio: The Hidden Factor Crushing Your Credit Score

Your credit utilization ratio might be the most important credit factor you've never heard of. It accounts for 30% of your FICO score, making it the second most influential factor after payment history.

## What Is Credit Utilization?

Credit utilization is the percentage of your available credit that you're currently using. It's calculated by dividing your total credit card balances by your total credit limits.

**Formula:** Credit Utilization = (Total Balances / Total Limits) × 100

## Example Calculation

If you have:
- Card 1: $500 balance, $2,000 limit
- Card 2: $300 balance, $3,000 limit
- Card 3: $200 balance, $5,000 limit

Total Balance: $1,000
Total Limit: $10,000
Utilization: 10%

## What's the Optimal Utilization?

| Utilization | Impact on Score |
|-------------|-----------------|
| 0% | Not ideal (shows no activity) |
| 1-10% | Excellent |
| 11-30% | Good |
| 31-50% | Fair (may hurt score) |
| 51%+ | Poor (significantly hurts score) |

## Important: Per-Card vs. Overall Utilization

Both matter! You could have 25% overall utilization, but if one card is at 90%, that will hurt your score. Try to keep each card under 30%.

## Strategies to Lower Utilization

1. **Pay Before Statement Closes** - Most issuers report your balance on the statement date
2. **Request Limit Increases** - Higher limits = lower utilization
3. **Open New Cards Strategically** - Adds to your available credit
4. **Make Multiple Payments Per Month** - Keeps balances consistently low
5. **Spread Spending Across Cards** - Avoid maxing out any single card

## The Secret Weapon: Statement Date Strategy

Most credit card issuers report your balance to credit bureaus on your statement closing date. If you pay down your balance before that date, a lower balance gets reported.

This can boost your score within one billing cycle without changing your spending habits.
    `,
  },
  {
    slug: "how-to-dispute-credit-report-errors",
    title: "How to Dispute Credit Report Errors: Step-by-Step Guide",
    excerpt: "Learn exactly how to identify and dispute errors on your credit report. Free templates and strategies to get inaccurate information removed.",
    category: "Credit Reports",
    tags: ["credit dispute", "credit report errors", "FCRA", "dispute letter"],
    author: "Horizon Credit Team",
    date: "2024-12-02",
    readTime: "6 min read",
    featured: true,
    content: `
# How to Dispute Credit Report Errors: Step-by-Step Guide

Credit report errors are more common than you might think. According to the FTC, one in five Americans has an error on at least one of their credit reports. These errors can cost you money through higher interest rates and even cause you to be denied credit.

## Step 1: Get Your Credit Reports

You're entitled to one free credit report from each bureau annually at AnnualCreditReport.com. Get reports from:
- Experian
- Equifax
- TransUnion

## Step 2: Review Each Report Carefully

Look for:
- Accounts you don't recognize
- Incorrect payment history
- Wrong personal information
- Duplicate accounts
- Outdated negative information

## Step 3: Gather Documentation

Before disputing, collect evidence:
- Payment receipts
- Bank statements
- Correspondence with creditors
- Court documents if applicable

## Step 4: File Your Dispute

You can dispute:
- **Online** - Through each bureau's website
- **By Mail** - With a written dispute letter
- **By Phone** - Though this creates no paper trail

Written disputes are recommended as they create documentation.

## Step 5: Wait for Investigation

Under the FCRA, credit bureaus must:
- Investigate within 30 days
- Forward your dispute to the creditor
- Review all evidence you provide
- Remove or correct unverified items

## Step 6: Review Results

You'll receive results by mail. If the dispute is:
- **Successful** - Item is removed or corrected
- **Unsuccessful** - You can add a consumer statement, escalate, or dispute again with more evidence

## What If the Dispute Fails?

- Request method of verification
- Dispute directly with the creditor
- File a complaint with the CFPB
- Consider professional help

## Your Rights Under the FCRA

The Fair Credit Reporting Act gives you:
- Right to dispute any information
- Right to an investigation within 30 days
- Right to have unverified items removed
- Right to add a statement to your file

Don't let errors on your credit report hold you back. Take action today.
    `,
  },
  {
    slug: "secured-credit-cards-guide",
    title: "Secured Credit Cards: The Best Way to Build Credit from Scratch",
    excerpt: "Everything you need to know about secured credit cards, how they work, and which ones are best for building or rebuilding credit.",
    category: "Credit Building",
    tags: ["secured credit card", "build credit", "credit cards", "no credit"],
    author: "Horizon Credit Team",
    date: "2024-12-01",
    readTime: "5 min read",
    content: `
# Secured Credit Cards: The Best Way to Build Credit from Scratch

If you're new to credit or rebuilding after financial difficulties, a secured credit card is often your best first step. These cards are designed specifically to help people establish or rebuild credit.

## What Is a Secured Credit Card?

A secured credit card requires a refundable security deposit that typically becomes your credit limit. For example, if you deposit $500, you'll have a $500 credit limit.

## How Secured Cards Build Credit

When you use a secured card responsibly:
1. The issuer reports your activity to credit bureaus
2. On-time payments build positive payment history
3. Low utilization improves your utilization ratio
4. Your credit file gains account age

## Choosing the Right Secured Card

Look for:
- Reports to all three bureaus
- No annual fee (or a low one)
- Path to graduation to an unsecured card
- Reasonable minimum deposit ($200-$500)
- Rewards if available

## Top Secured Cards to Consider

1. **Discover it Secured** - No annual fee, cash back rewards, auto-reviews for graduation
2. **Capital One Platinum Secured** - Low deposit options, automatic upgrade path
3. **Chime Credit Builder** - No deposit required, no fees
4. **OpenSky Secured Visa** - No credit check required

## How to Use a Secured Card

Follow these best practices:
- Keep utilization under 10%
- Pay balance in full each month
- Never miss a payment
- Use for small, recurring charges
- Don't close when you graduate

## When to Expect Results

With responsible use:
- 3 months: You may see initial score improvement
- 6 months: Score typically increases noticeably
- 12 months: Many cards offer graduation to unsecured

## The Path to Unsecured Credit

After 6-12 months of responsible secured card use, you may qualify for:
- Unsecured version of your secured card
- Entry-level rewards cards
- Store credit cards
- Credit-builder loans
    `,
  },
  {
    slug: "credit-repair-companies-what-to-know",
    title: "Credit Repair Companies: What You Need to Know Before Signing Up",
    excerpt: "Are credit repair companies legitimate? Learn how they work, what they can and cannot do, and how to avoid scams.",
    category: "Credit Repair",
    tags: ["credit repair", "credit repair companies", "scams", "CROA"],
    author: "Horizon Credit Team",
    date: "2024-11-30",
    readTime: "5 min read",
    content: `
# Credit Repair Companies: What You Need to Know Before Signing Up

Credit repair is a legitimate industry, but it's also one with its share of scams and misleading claims. Here's what you need to know before working with any credit repair company.

## What Credit Repair Companies Actually Do

Legitimate credit repair companies:
- Review your credit reports for errors
- File disputes with credit bureaus
- Communicate with creditors on your behalf
- Provide ongoing monitoring and follow-up
- Offer credit education and guidance

## What They Cannot Do

No credit repair company can:
- Remove accurate negative information legally
- Guarantee specific results
- Create a "new credit identity" (this is illegal)
- Charge fees before services are performed
- Promise to boost your score by a specific amount

## Your Rights Under CROA

The Credit Repair Organizations Act protects consumers:
- Companies cannot charge upfront fees
- You must receive a written contract
- You have a 3-day right to cancel
- Companies must explain your right to DIY
- Guarantees of results are prohibited

## Red Flags to Watch For

Be wary of companies that:
- Promise to remove all negative items
- Guarantee specific score increases
- Suggest disputing accurate information
- Ask for full payment upfront
- Advise you to create a new identity
- Pressure you to sign immediately

## Questions to Ask Before Signing

1. How long have you been in business?
2. Can you provide references?
3. What exactly is included in your service?
4. How are disputes handled?
5. What's your success rate?
6. What happens if I'm not satisfied?

## DIY vs. Professional Help

You can dispute errors yourself for free. However, professional services offer:
- Expertise in consumer credit law
- Proven dispute strategies
- Time savings
- Ongoing support

Consider professional help if you have multiple issues or previous DIY attempts failed.

## Making the Right Choice

Research any credit repair company thoroughly. Check BBB ratings, online reviews, and complaints with the CFPB. A reputable company will be transparent about their process and realistic about potential outcomes.
    `,
  },
  {
    slug: "how-late-payments-affect-credit-score",
    title: "How Late Payments Affect Your Credit Score (And How to Recover)",
    excerpt: "Understand how late payments impact your credit score and learn strategies to minimize damage and recover faster.",
    category: "Credit Scores",
    tags: ["late payments", "payment history", "credit score", "credit recovery"],
    author: "Horizon Credit Team",
    date: "2024-11-29",
    readTime: "4 min read",
    content: `
# How Late Payments Affect Your Credit Score (And How to Recover)

Payment history is the single most important factor in your credit score, accounting for 35% of your FICO score. Understanding how late payments affect your score can help you avoid mistakes and recover faster if they occur.

## How Late Payments Are Reported

Payments are typically reported to credit bureaus in stages:
- **Under 30 days late** - Not usually reported
- **30 days late** - First reporting, significant impact
- **60 days late** - More serious, larger impact
- **90 days late** - Severely damages score
- **120+ days late** - May result in charge-off or collections

## The Impact on Your Score

A single 30-day late payment can:
- Drop your score by 60-110 points
- Stay on your report for 7 years
- Affect loan eligibility and rates

The impact depends on:
- Your starting score (higher scores drop more)
- How recent the late payment is
- Your overall credit history
- Number of late payments

## Strategies to Recover

### 1. Get Current Immediately
The first step is always to bring the account current. The sooner you do this, the less damage.

### 2. Request a Goodwill Adjustment
If you have a good history with the creditor, write a goodwill letter asking them to remove the late payment. Explain what happened and your record of on-time payments.

### 3. Set Up Payment Reminders
Prevent future late payments with:
- Automatic payments
- Calendar reminders
- Payment alerts from your bank

### 4. Focus on Positive History
Going forward, perfect payment history will gradually rebuild your score. The older the late payment gets, the less it affects your score.

### 5. Check for Errors
Sometimes late payments are reported in error. Review your reports and dispute any inaccuracies.

## Prevention Is Key

The best strategy is prevention:
- Set up automatic minimum payments
- Keep a buffer in your bank account
- Use payment reminder apps
- Consider due date alignment with payday

One late payment can take years to recover from. Make on-time payments your top priority.
    `,
  },
  {
    slug: "debt-collection-rights-guide",
    title: "Your Rights When Dealing with Debt Collectors: Complete Guide",
    excerpt: "Know your rights under the FDCPA when debt collectors contact you. Learn what they can and cannot do, and how to respond.",
    category: "Debt",
    tags: ["debt collection", "FDCPA", "consumer rights", "collections"],
    author: "Horizon Credit Team",
    date: "2024-11-28",
    readTime: "5 min read",
    content: `
# Your Rights When Dealing with Debt Collectors: Complete Guide

Dealing with debt collectors can be stressful, but you have significant legal protections under the Fair Debt Collection Practices Act (FDCPA). Understanding your rights can help you handle collection situations effectively.

## What Collectors Cannot Do

Under the FDCPA, debt collectors cannot:
- Call before 8 AM or after 9 PM
- Call you at work if you've told them not to
- Use abusive, profane, or threatening language
- Lie about who they are or what you owe
- Threaten actions they cannot or won't take
- Contact you after you've requested they stop (in writing)
- Discuss your debt with others (except your attorney)
- Add unauthorized fees or interest

## Your Right to Debt Validation

Within 5 days of first contact, collectors must send you a written notice containing:
- The amount of the debt
- The name of the creditor
- Your right to dispute the debt

You have 30 days to request debt validation. If you do, they must stop collection until they provide:
- Proof you owe the debt
- Proof they have authority to collect
- The original creditor's information

## How to Stop Collector Contact

To stop collector calls, send a written "cease and desist" letter via certified mail. After receiving it, they can only contact you to:
- Confirm they've received your letter
- Notify you of specific actions (like filing a lawsuit)

Note: This doesn't make the debt go away.

## Statute of Limitations

Every state has a statute of limitations on debt collection. Once it expires:
- Collectors can still try to collect
- But they cannot sue you for the debt
- Be careful: making a payment can restart the clock

## If a Collector Violates the Law

You can:
- File a complaint with the CFPB
- File a complaint with the FTC
- File a complaint with your state attorney general
- Sue the collector (damages up to $1,000 plus attorney fees)

## Negotiating with Collectors

If the debt is valid, consider:
- Settling for less than the full amount
- Requesting a pay-for-delete agreement
- Setting up a payment plan you can afford
- Getting any agreement in writing before paying

Know your rights and use them. Don't let collectors intimidate you into payments you cannot afford or agreements that aren't in your best interest.
    `,
  },
  {
    slug: "bankruptcy-and-credit-recovery",
    title: "Life After Bankruptcy: How to Rebuild Your Credit Score",
    excerpt: "Bankruptcy isn't the end of your credit journey. Learn how to rebuild your credit after Chapter 7 or Chapter 13 bankruptcy.",
    category: "Credit Repair",
    tags: ["bankruptcy", "credit recovery", "rebuild credit", "Chapter 7", "Chapter 13"],
    author: "Horizon Credit Team",
    date: "2024-11-27",
    readTime: "5 min read",
    content: `
# Life After Bankruptcy: How to Rebuild Your Credit Score

Bankruptcy can feel like a financial catastrophe, but it's actually a fresh start. Many people rebuild excellent credit within 2-4 years after bankruptcy. Here's how to do it.

## Understanding Bankruptcy's Impact

- **Chapter 7** stays on your report for 10 years from filing
- **Chapter 13** stays for 7 years from filing

However, the impact decreases significantly each year. Most of the score damage happens in the first two years.

## When Can You Start Rebuilding?

- **Chapter 7** - Immediately after discharge (typically 4-6 months after filing)
- **Chapter 13** - Technically during repayment, but most focus on rebuilding after discharge

## Step-by-Step Rebuilding Plan

### Year 1: Foundation

1. **Get a secured credit card** - Available immediately after discharge
2. **Consider a credit-builder loan** - Adds installment credit to your mix
3. **Become an authorized user** - If a family member has good credit
4. **Make all payments on time** - Perfect payment history is crucial

### Year 2: Building

1. **Apply for another card** - Add a second credit card
2. **Monitor your credit** - Check for errors regularly
3. **Keep utilization low** - Under 10% is ideal
4. **Don't close old accounts** - Unless they have fees

### Years 3-5: Optimization

1. **Upgrade to unsecured cards** - Graduate from secured cards
2. **Consider auto financing** - Start building installment credit
3. **Apply for better cards** - As your score improves
4. **Begin mortgage preparation** - FHA loans may be possible

## Credit Milestones After Bankruptcy

- **1 year** - Qualify for secured cards, some auto loans
- **2 years** - FHA mortgage possible (Chapter 7)
- **3-4 years** - Score can reach 700+
- **4 years** - Some conventional mortgages possible

## Keys to Success

1. Never miss a payment
2. Keep credit utilization very low
3. Be patient and consistent
4. Don't apply for too much credit at once
5. Monitor your credit reports

## The Silver Lining

Bankruptcy wipes out debt that was dragging down your score. With fresh start and good habits, many people achieve higher scores than they had before filing.

You are not defined by your bankruptcy. Your financial future is still in your hands.
    `,
  },
  {
    slug: "hard-vs-soft-credit-inquiries",
    title: "Hard vs Soft Credit Inquiries: What's the Difference?",
    excerpt: "Not all credit checks are created equal. Learn the difference between hard and soft inquiries and how they affect your credit score.",
    category: "Credit Scores",
    tags: ["credit inquiry", "hard pull", "soft pull", "credit check"],
    author: "Horizon Credit Team",
    date: "2024-11-26",
    readTime: "4 min read",
    content: `
# Hard vs Soft Credit Inquiries: What's the Difference?

When someone checks your credit, it's called an inquiry. But not all inquiries are the same. Understanding the difference between hard and soft inquiries can help you protect your credit score.

## Hard Inquiries

Hard inquiries (or "hard pulls") occur when you apply for credit and the lender checks your credit report.

**Examples:**
- Credit card applications
- Mortgage applications
- Auto loan applications
- Personal loan applications
- Apartment applications (sometimes)

**Impact:**
- Can lower your score by 5-10 points
- Stays on your report for 2 years
- Affects your score for about 12 months
- Multiple inquiries can compound the effect

## Soft Inquiries

Soft inquiries (or "soft pulls") don't affect your credit score at all.

**Examples:**
- Checking your own credit
- Pre-approval offers
- Employer background checks
- Insurance quotes
- Account reviews by current creditors

**Impact:**
- No effect on your credit score
- May or may not appear on your report
- Only you can see them

## The Rate Shopping Exception

When shopping for a mortgage, auto loan, or student loan, multiple inquiries within a short period (14-45 days depending on the scoring model) count as a single inquiry. This allows you to rate shop without being penalized.

## How to Minimize Hard Inquiry Impact

1. **Only apply when needed** - Don't apply for credit you don't need
2. **Rate shop quickly** - Do comparison shopping within 2 weeks
3. **Check pre-qualification first** - Many lenders offer soft-pull pre-approval
4. **Space out applications** - Wait 3-6 months between applications

## How Long Do Inquiries Matter?

- Hard inquiries affect your score for about 12 months
- They remain visible on your report for 2 years
- The impact diminishes over time
- Multiple inquiries are more damaging than one

## Can You Remove Hard Inquiries?

If a hard inquiry was unauthorized, you can dispute it. Otherwise, legitimate inquiries cannot be removed early. Focus on building positive credit habits rather than worrying about inquiries.

One or two hard inquiries have minimal impact. The bigger factors in your score are payment history and credit utilization.
    `,
  },
  {
    slug: "credit-freeze-vs-fraud-alert",
    title: "Credit Freeze vs Fraud Alert: Which Protection Do You Need?",
    excerpt: "Protect yourself from identity theft with credit freezes and fraud alerts. Learn how each works and when to use them.",
    category: "Identity Protection",
    tags: ["credit freeze", "fraud alert", "identity theft", "credit protection"],
    author: "Horizon Credit Team",
    date: "2024-11-25",
    readTime: "4 min read",
    content: `
# Credit Freeze vs Fraud Alert: Which Protection Do You Need?

With identity theft affecting millions of Americans each year, protecting your credit is essential. Two key tools are credit freezes and fraud alerts. Here's how they differ and when to use each.

## Credit Freeze (Security Freeze)

A credit freeze restricts access to your credit report, preventing creditors from seeing it and making it nearly impossible for identity thieves to open new accounts in your name.

**How it works:**
- Blocks new creditors from accessing your report
- Existing creditors can still access it
- You can lift temporarily when applying for credit
- Free to place and lift
- Must be done with each bureau separately

**Best for:**
- Proactive protection for everyone
- After identity theft occurs
- If your information was in a data breach
- If you're not actively applying for credit

## Fraud Alert

A fraud alert notifies potential creditors to verify your identity before opening new accounts in your name. It's a flag on your credit report, not a complete block.

**Types:**
- **Initial alert** - Lasts 1 year, requires only one bureau (they notify others)
- **Extended alert** - Lasts 7 years, requires identity theft report
- **Active duty alert** - For military members, lasts 1 year

**Best for:**
- Quick protection after suspicious activity
- While traveling
- As a complement to a credit freeze
- If you want to avoid the hassle of unfreezing for applications

## Key Differences

| Feature | Credit Freeze | Fraud Alert |
|---------|---------------|-------------|
| Access blocked | Yes | No (just extra verification) |
| Duration | Until you lift it | 1-7 years |
| Cost | Free | Free |
| Bureaus | Must do each separately | One notifies all |
| Lifting | You control | Automatic expiration |

## How to Place a Credit Freeze

Contact each bureau:
- Experian: experian.com/freeze
- Equifax: equifax.com/personal/credit-report-services/credit-freeze/
- TransUnion: transunion.com/credit-freeze

## How to Place a Fraud Alert

Contact any one bureau; they'll notify the others:
- Experian: 1-888-397-3742
- Equifax: 1-800-525-6285
- TransUnion: 1-800-680-7289

## Recommendation

For maximum protection, consider using both. A credit freeze provides strong protection, while a fraud alert adds an extra layer of verification.
    `,
  },
  {
    slug: "medical-debt-credit-report-changes",
    title: "Medical Debt and Credit Reports: New Rules You Need to Know",
    excerpt: "Major changes to how medical debt affects your credit score. Learn about new protections and what they mean for you.",
    category: "Credit Reports",
    tags: ["medical debt", "credit report changes", "medical bills", "credit score"],
    author: "Horizon Credit Team",
    date: "2024-11-24",
    readTime: "4 min read",
    content: `
# Medical Debt and Credit Reports: New Rules You Need to Know

Medical debt has been treated differently on credit reports starting in 2023, providing significant relief for millions of Americans. Here's what you need to know about the changes.

## The Changes

### What's No Longer Reported

- **Paid medical collections** - As of July 2022, paid medical debt no longer appears on credit reports
- **Small medical debt** - Collections under $500 are no longer reported (as of April 2023)
- **Longer grace period** - Medical debt must be 12 months old before it can be reported (increased from 6 months)

### What This Means for You

If you have paid medical collections on your credit report, they should have been removed automatically. Check your reports to confirm.

## Why This Matters

Medical debt is unique because:
- Often results from emergencies, not irresponsibility
- Complex billing creates confusion and errors
- Insurance complications cause delays
- Many people don't know they owe until collections

The changes recognize that medical debt shouldn't penalize consumers the same way as other debts.

## Upcoming Changes

Additional changes are expected, including:
- Further reduction in what medical debt can be reported
- More protections for consumers disputing medical bills
- Better billing transparency from providers

## If You Have Medical Debt

### Step 1: Verify the Debt
Request an itemized bill and verify:
- The services were provided
- Insurance was billed correctly
- The amount is accurate

### Step 2: Negotiate
- Ask about financial assistance programs
- Request a payment plan
- Negotiate for a lower settlement amount

### Step 3: Check Your Credit Reports
- Verify paid debts have been removed
- Dispute any inaccurate medical collections
- Document everything

## Important Timeline

- **0-12 months** - Cannot be reported to credit bureaus
- **12+ months, under $500** - Cannot be reported
- **12+ months, over $500** - Can be reported
- **When paid** - Must be removed from reports

## Getting Help

If medical debt is affecting your credit and you believe it shouldn't be, or if you're struggling to resolve medical billing issues, professional help may be beneficial.
    `,
  },
  {
    slug: "authorized-user-credit-building",
    title: "Authorized User Strategy: How to Build Credit Using Someone Else's Card",
    excerpt: "Becoming an authorized user can boost your credit score quickly. Learn how this strategy works and potential pitfalls to avoid.",
    category: "Credit Building",
    tags: ["authorized user", "build credit", "credit cards", "credit piggybacking"],
    author: "Horizon Credit Team",
    date: "2024-11-23",
    readTime: "4 min read",
    content: `
# Authorized User Strategy: How to Build Credit Using Someone Else's Card

Becoming an authorized user on someone else's credit card is one of the fastest ways to build or improve your credit score. Here's everything you need to know about this powerful strategy.

## How It Works

When someone adds you as an authorized user to their credit card account:
1. The account appears on your credit report
2. The account's history can affect your score
3. You receive a card with your name on it
4. You can (but don't have to) use the card

## Benefits

- **Quick results** - Can impact your score within 30 days
- **Inherits positive history** - Gets the account's payment history
- **Lowers utilization** - Adds to your available credit
- **No application needed** - No hard inquiry on your report
- **Minimal risk** - You're not legally responsible for the debt

## Ideal Characteristics of the Account

Look for an account with:
- Long history (5+ years is ideal)
- Perfect payment history
- Low utilization (under 30%)
- High credit limit
- Reports to all three bureaus

## Potential Impact

A good authorized user account can add:
- 30-50 points for someone with thin credit
- 20-40 points for someone rebuilding credit
- 10-20 points for someone with established credit

Results vary based on your overall credit profile.

## Risks to Consider

### For the Authorized User:
- If the primary holder misses payments, it hurts your score
- Removed from the account at any time

### For the Primary Account Holder:
- Responsible for all charges you make
- Can affect their utilization if you spend a lot

## Best Practices

1. **Choose carefully** - Only with someone you trust completely
2. **Check if they report** - Not all issuers report authorized users
3. **Monitor the account** - Watch for problems
4. **Have an agreement** - Decide if you'll use the card or not
5. **Eventually graduate** - Build toward your own accounts

## Which Issuers Report Authorized Users?

Most major issuers report authorized users, including:
- American Express
- Bank of America
- Capital One
- Chase
- Citi
- Discover
- Wells Fargo

Some issuers don't report or have age requirements. Check before adding.

## The Ethical Approach

This strategy works best within families—parents adding children, spouses helping each other. Be cautious of commercial "credit piggybacking" services, which can be risky or even fraudulent.
    `,
  },
  {
    slug: "credit-score-myths-debunked",
    title: "10 Credit Score Myths That Could Be Costing You Money",
    excerpt: "Stop believing these common credit score myths. Learn the truth and stop making mistakes that hurt your credit.",
    category: "Credit Scores",
    tags: ["credit myths", "credit facts", "credit misconceptions", "credit education"],
    author: "Horizon Credit Team",
    date: "2024-11-22",
    readTime: "4 min read",
    content: `
# 10 Credit Score Myths That Could Be Costing You Money

Credit score myths are everywhere, and believing them can cost you money and opportunities. Let's separate fact from fiction.

## Myth 1: Checking Your Credit Hurts Your Score
**Truth:** Checking your own credit is a soft inquiry and has zero impact on your score. Check as often as you like.

## Myth 2: Carrying a Balance Builds Credit
**Truth:** This myth costs people money in interest. Pay your balance in full each month. You build credit by using your card and paying on time, not by paying interest.

## Myth 3: Closing Old Cards Helps Your Score
**Truth:** Closing cards usually hurts your score by reducing your credit history length and increasing your utilization ratio. Keep old cards open.

## Myth 4: You Only Have One Credit Score
**Truth:** You have dozens of credit scores from different scoring models and bureaus. FICO alone has multiple versions.

## Myth 5: Income Affects Your Credit Score
**Truth:** Income is not a factor in credit score calculations. You can have a high income and terrible credit, or modest income with excellent credit.

## Myth 6: Married Couples Share Credit Scores
**Truth:** Each person has their own individual credit score. Marriage doesn't merge your credit files.

## Myth 7: Paying Off a Collection Removes It
**Truth:** Paid collections can still remain on your report for 7 years. However, newer FICO models (FICO 9) ignore paid collections.

## Myth 8: All Debt Is Bad for Credit
**Truth:** Responsibly managed debt actually helps build credit. Having no credit history can hurt you.

## Myth 9: Credit Repair Is a Scam
**Truth:** Credit repair is legal and can be effective for removing inaccurate information. The key is working with legitimate companies.

## Myth 10: Disputing Items Always Fails
**Truth:** Disputes succeed when information is inaccurate, incomplete, or unverifiable. Many people successfully dispute errors.

## The Bottom Line

Making decisions based on myths can hurt your credit and your wallet. Always verify credit advice with reliable sources, and don't let misconceptions guide your financial decisions.
    `,
  },
  {
    slug: "how-to-read-credit-report",
    title: "How to Read Your Credit Report: A Complete Guide",
    excerpt: "Your credit report contains crucial information about your financial life. Learn how to read and understand every section.",
    category: "Credit Reports",
    tags: ["credit report", "how to read", "credit report sections", "credit education"],
    author: "Horizon Credit Team",
    date: "2024-11-21",
    readTime: "5 min read",
    content: `
# How to Read Your Credit Report: A Complete Guide

Your credit report is like your financial report card. Understanding how to read it is essential for managing your credit health. Here's a section-by-section breakdown.

## Section 1: Personal Information

This section includes:
- Your full legal name (and variations)
- Current and previous addresses
- Date of birth
- Social Security number (partially hidden)
- Employment information

**What to check:** Verify all information is correct. Errors here could indicate mixed files or identity theft.

## Section 2: Credit Accounts (Trade Lines)

For each account, you'll see:
- Creditor name
- Account number (partially hidden)
- Account type (revolving, installment, mortgage)
- Date opened
- Credit limit or original loan amount
- Current balance
- Payment status
- Payment history (up to 7 years)

**What to check:**
- Do you recognize all accounts?
- Are credit limits accurate?
- Is payment history correct?
- Are closed accounts marked correctly?

## Section 3: Credit Inquiries

Lists who has accessed your credit report:
- **Hard inquiries** - From credit applications
- **Soft inquiries** - From you, employers, prescreened offers

**What to check:** Do you recognize all hard inquiries? Unknown inquiries could indicate fraud or errors.

## Section 4: Public Records

May include:
- Bankruptcies
- Note: Tax liens and civil judgments are no longer included

**What to check:** Verify accuracy and that items are within the proper reporting period.

## Section 5: Collection Accounts

Shows debts sent to collection agencies:
- Original creditor
- Collection agency
- Amount owed
- Date of first delinquency

**What to check:** Are collections accurate? Have you paid any that still show unpaid?

## Common Codes and Abbreviations

- **R1** - Revolving account, paid as agreed
- **I1** - Installment account, paid as agreed
- **30, 60, 90, 120** - Days past due
- **CO** - Charge-off
- **CLS** - Closed
- **CURR** - Current

## Red Flags to Watch For

1. Accounts you don't recognize
2. Wrong personal information
3. Incorrect payment history
4. Duplicate accounts
5. Outdated negative information
6. Wrong credit limits or balances

## What to Do If You Find Errors

1. Document the error
2. Gather supporting evidence
3. File a dispute with the credit bureau
4. Follow up within 30 days
5. Check that corrections are made

Understanding your credit report is the first step to taking control of your credit health.
    `,
  },
  {
    slug: "student-loans-credit-score-impact",
    title: "How Student Loans Affect Your Credit Score: The Complete Picture",
    excerpt: "Student loans have a unique impact on your credit. Learn how they help and hurt your score, and strategies for managing them.",
    category: "Debt",
    tags: ["student loans", "credit score", "student debt", "loan management"],
    author: "Horizon Credit Team",
    date: "2024-11-20",
    readTime: "5 min read",
    content: `
# How Student Loans Affect Your Credit Score: The Complete Picture

Student loans are a reality for millions of Americans. Understanding how they impact your credit score can help you manage them effectively and build credit at the same time.

## The Positive Impact

Student loans can help your credit score by:

### Building Payment History
On-time payments contribute positively to your payment history, which is 35% of your FICO score.

### Adding Credit Mix
Student loans are installment loans, adding diversity to your credit mix if you only have credit cards.

### Establishing Credit History
For many young people, student loans are their first credit accounts, beginning their credit history.

## The Negative Impact

Student loans can hurt your credit when:

### Missed or Late Payments
Even one 30-day late payment can significantly damage your score. Federal loans typically report after 90 days.

### High Debt-to-Income Ratio
While DTI doesn't directly affect your score, it matters for loan applications, especially mortgages.

### Default
Defaulting on student loans devastates your credit and can lead to wage garnishment.

## Key Differences: Federal vs Private

### Federal Student Loans
- More flexible repayment options
- Income-driven repayment available
- Deferment and forbearance options
- Report late after 90 days
- Default after 270 days of non-payment

### Private Student Loans
- Fewer repayment options
- May report late after 30 days
- Default terms vary by lender

## Strategies for Credit Building

1. **Always pay on time** - Set up auto-pay (often gets you a rate discount)
2. **Choose the right repayment plan** - Make sure payments are affordable
3. **Keep accounts in good standing** - Avoid forbearance if possible
4. **Rehabilitate if in default** - Federal loans can be rehabilitated

## Income-Driven Repayment and Credit

IDR plans can help by:
- Lowering your monthly payment to an affordable amount
- Keeping your loans in good standing
- Preventing default

They don't negatively impact your credit score directly.

## Student Loan Forgiveness

If you qualify for forgiveness (PSLF, IDR forgiveness), the forgiven amount:
- Does not hurt your credit
- Account is marked as paid in full
- May be taxable as income (varies by program)

## After Payoff

When you pay off student loans:
- Your score may temporarily dip (closed account)
- The positive history remains for 10 years
- Long-term impact is positive
    `,
  },
  {
    slug: "credit-card-churning-risks",
    title: "Credit Card Churning: Is the Risk to Your Credit Score Worth It?",
    excerpt: "Credit card churning can earn you big rewards, but what's the impact on your credit? Understand the risks before you start.",
    category: "Credit Cards",
    tags: ["credit card churning", "rewards", "credit score impact", "credit cards"],
    author: "Horizon Credit Team",
    date: "2024-11-19",
    readTime: "4 min read",
    content: `
# Credit Card Churning: Is the Risk to Your Credit Score Worth It?

Credit card churning—repeatedly opening cards for sign-up bonuses—can be lucrative, but it comes with credit score implications. Here's what you need to know.

## What Is Credit Card Churning?

Churning involves:
1. Opening a new credit card for the sign-up bonus
2. Meeting the minimum spending requirement
3. Earning the bonus (cash back, points, miles)
4. Possibly closing the card after the first year
5. Repeating with another card

## The Credit Score Impact

### Short-Term Effects

**Negatives:**
- Each application creates a hard inquiry (-5 to -10 points)
- New accounts lower your average account age
- Multiple inquiries can be a red flag

**Positives:**
- Higher total credit limit (lower utilization)
- New accounts (credit mix)

### Long-Term Effects

If you churn responsibly:
- Initial dips usually recover within a few months
- Increased credit limits can help your score
- Long payment history on accounts you keep

If you churn irresponsibly:
- Many hard inquiries compound damage
- Short average account age hurts
- Closing accounts increases utilization

## Risk Factors to Consider

1. **Starting Score** - Higher scores are more resilient but also have more to lose
2. **Number of Recent Applications** - Banks may deny you if you've opened many cards
3. **Chase 5/24 Rule** - Chase denies applicants with 5+ new cards in 24 months
4. **Total Debt** - Opening cards to spend more creates financial risk
5. **Organization** - Missed payments would devastate your strategy

## Is Churning Right for You?

**Good candidates:**
- Already have excellent credit (760+)
- Disciplined with spending
- Organized with payment due dates
- Not planning major purchases (mortgage, car) soon
- Understand the rules and risks

**Bad candidates:**
- Below 700 credit score
- Tend to overspend
- Might miss payments
- Applying for mortgage in next 6-12 months
- Need credit for other purposes

## Best Practices If You Churn

1. Limit applications to 1-2 cards every 3-6 months
2. Never carry a balance (negates rewards with interest)
3. Keep your oldest cards open
4. Meet spending minimums with normal spending or prepaid bills
5. Track all due dates meticulously
6. Monitor your credit scores monthly

## The Verdict

For most people, the credit score risks outweigh the rewards. But for disciplined individuals with excellent credit and no major purchases planned, strategic churning can work.

Proceed with caution and full understanding of the implications.
    `,
  },
  {
    slug: "first-credit-card-tips",
    title: "Getting Your First Credit Card: Everything You Need to Know",
    excerpt: "Your first credit card is a big step. Learn how to choose the right card, use it responsibly, and build credit from day one.",
    category: "Credit Building",
    tags: ["first credit card", "build credit", "credit cards", "starter credit"],
    author: "Horizon Credit Team",
    date: "2024-11-18",
    readTime: "5 min read",
    content: `
# Getting Your First Credit Card: Everything You Need to Know

Your first credit card is an important step in building your financial future. Used responsibly, it's one of the best tools for establishing credit. Here's everything you need to know.

## Types of First Credit Cards

### Student Credit Cards
Best for: College students
Features: Lower credit limits, no credit history required, some rewards
Examples: Discover it Student, Capital One Journey

### Secured Credit Cards
Best for: Anyone building credit from scratch
Features: Requires security deposit, reports to bureaus
Examples: Discover it Secured, Capital One Platinum Secured

### Starter Unsecured Cards
Best for: Those with thin credit or being added as authorized user first
Features: No deposit, basic rewards, lower limits

## What to Look For

1. **No annual fee** - Don't pay to build credit
2. **Reports to all three bureaus** - Essential for building credit
3. **Reasonable APR** - In case you need to carry a balance (avoid this)
4. **Simple rewards** - Cash back is easiest to understand
5. **Path to upgrade** - Secured cards should offer graduation

## Using Your First Card Responsibly

### The Rules

1. **Pay your full balance every month** - Never pay interest
2. **Keep utilization under 30%** - Ideally under 10%
3. **Never miss a payment** - Set up autopay for at least the minimum
4. **Only spend what you can afford** - Treat it like a debit card

### Smart Uses

- Small recurring bills (streaming, phone)
- Gas or groceries (categories you'd spend on anyway)
- Online purchases (better fraud protection than debit)

### What Not to Do

- Max out your card
- Miss payments
- Make only minimum payments
- Use for impulse purchases
- Take cash advances

## Building Credit with Your First Card

With responsible use, expect:

**3 months:** Credit score established
**6 months:** Modest score improvement
**12 months:** Significant credit building

## Common Mistakes to Avoid

1. **Applying for too many cards** - One is enough to start
2. **Closing the card too soon** - Keep it open for history
3. **Ignoring statements** - Review monthly for errors and fraud
4. **Not having a budget** - Know what you can afford

## After You're Established

Once you have 6-12 months of responsible use:
- Request a credit limit increase
- Consider a rewards card
- Graduate from secured to unsecured (if applicable)
- Continue the good habits you've built

Your first credit card sets the foundation for your entire credit history. Start right, and you'll thank yourself for years to come.
    `,
  },
  {
    slug: "rent-reporting-services-guide",
    title: "Rent Reporting Services: Can Paying Rent Build Your Credit?",
    excerpt: "Your rent payments could be building your credit. Learn about rent reporting services and whether they're worth it for you.",
    category: "Credit Building",
    tags: ["rent reporting", "build credit", "credit score", "rent payments"],
    author: "Horizon Credit Team",
    date: "2024-11-17",
    readTime: "4 min read",
    content: `
# Rent Reporting Services: Can Paying Rent Build Your Credit?

You pay rent every month—shouldn't that help your credit? Traditionally, rent payments weren't reported to credit bureaus. But rent reporting services are changing that. Here's what you need to know.

## How Rent Reporting Works

Rent reporting services verify your rent payments and report them to one or more credit bureaus. This adds a tradeline to your credit report showing your payment history.

## Types of Rent Reporting

### Landlord-Based
Some property management companies report rent directly through services like:
- RentTrack
- PayYourRent
- Rent Dynamics

### Tenant-Initiated Services
You sign up and connect your bank account or provide proof of payments:
- Rental Kharma
- Boom
- LevelCredit (now Self)
- Experian Boost (free, but only Experian)

## How Much Does It Help?

Impact varies based on:
- Your current credit profile
- Which bureaus receive reports
- Your overall credit mix

**Typical impact:**
- No credit history: Can establish a score
- Thin file: May add 10-50 points
- Established credit: Smaller impact, 5-20 points

## Costs

Services range from free to $100+/year:
- **Experian Boost**: Free (Experian only)
- **Self/LevelCredit**: $6.95/month
- **Rental Kharma**: $50 one-time + $8.95/month
- **Boom**: $2/month

## Who Benefits Most

Rent reporting is most valuable for:
- People with no credit history
- Those with thin credit files
- Renters without other tradelines
- Anyone trying to establish credit without debt

## Limitations

Consider these factors:
- Not all lenders use scores that include rent
- Some only report to one bureau
- Late rent payments can hurt your score
- Cost may outweigh benefits for some

## Alternatives

If rent reporting doesn't fit, consider:
- Secured credit cards (similar credit-building benefit)
- Credit-builder loans
- Authorized user status
- Experian Boost for utilities (free)

## Is It Worth It?

**Worth it if:**
- You have little or no credit history
- You always pay rent on time
- The cost fits your budget
- You're actively trying to build credit

**Skip it if:**
- You already have established credit
- You sometimes pay rent late
- You'd rather invest in other credit-building tools

Rent reporting can be a valuable tool in your credit-building toolkit, especially if you have a thin credit file. Evaluate the costs and benefits for your specific situation.
    `,
  },
  {
    slug: "balance-transfer-credit-guide",
    title: "Balance Transfers: How to Use Them Wisely Without Hurting Your Credit",
    excerpt: "Balance transfers can help you pay off debt faster, but they can also hurt your credit if misused. Learn the smart approach.",
    category: "Credit Cards",
    tags: ["balance transfer", "credit cards", "debt payoff", "0% APR"],
    author: "Horizon Credit Team",
    date: "2024-11-16",
    readTime: "4 min read",
    content: `
# Balance Transfers: How to Use Them Wisely Without Hurting Your Credit

A balance transfer moves debt from one credit card to another, typically to take advantage of a lower interest rate. Used correctly, it's a powerful debt payoff tool. Used incorrectly, it can make things worse.

## How Balance Transfers Work

1. Apply for a balance transfer card (often with 0% intro APR)
2. Transfer existing balance to the new card
3. Pay off the balance during the promotional period
4. Avoid new charges on the old card

## Credit Score Impact

### Short-Term Effects

**Negative:**
- Hard inquiry from new card application (-5 to -10 points)
- New account lowers average age of accounts

**Positive:**
- Lower utilization if you get a higher limit
- Additional available credit

### Long-Term Effects

If you pay off the debt:
- Lower utilization = higher score
- Additional positive tradeline

If you don't pay it off:
- Higher balance on new card
- Possibly higher total debt if you keep spending

## Balance Transfer Best Practices

### Do:
- Calculate if you can pay off during the 0% period
- Stop using the old card (don't accumulate more debt)
- Make payments on time (late payment may void 0% APR)
- Set up autopay for at least the minimum
- Pay more than the minimum to pay off before promo ends

### Don't:
- Transfer more than you can pay off
- Make new purchases on the balance transfer card
- Miss payments
- Ignore the transfer fee in your calculations
- Close the old card immediately (hurts utilization)

## The Math

Before transferring, calculate:
- Balance to transfer
- Balance transfer fee (typically 3-5%)
- Monthly payment needed to pay off before promo ends
- Interest you'll save vs. current card

Example:
- $5,000 balance at 20% APR
- Transfer to 0% card with 3% fee ($150)
- 15-month 0% period
- Payment needed: $343/month
- Total paid: $5,150
- Without transfer at 20%: $5,850+ (paying minimums)
- Savings: $700+

## When to Avoid Balance Transfers

- You can't commit to paying it off
- The fee outweighs interest savings
- You'll keep spending on old cards
- You're applying for a mortgage soon
- Your credit isn't good enough to qualify

## After the Transfer

1. Make a payoff plan
2. Set up autopay
3. Avoid new debt
4. Don't close the old card (yet)
5. Celebrate when you're debt-free!

Balance transfers are a tool, not a solution. The solution is changing the behavior that led to debt in the first place.
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

