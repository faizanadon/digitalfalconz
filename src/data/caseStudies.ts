// Paid-media case studies for the six brands in the SEM/SMM portfolio deck.
// Presented as DigitalFalconz work, with no personal attribution — the deck's
// first-person wording is rewritten in the company voice ("we"/"our").
// Campaigns are transcribed from the deck in deck order; no hard metrics are
// claimed anywhere, because the deck text contains none. Mawa Group's two
// Facebook Ads slides are identical duplicates, so the campaign appears once.
export interface CaseStudyCampaign {
  channel: string;
  period: string;
  headline: string;
  challenge: string;
  achievement: string;
  /** Dashboard screenshot from the deck (public/work/). */
  image: { src: string; width: number; height: number };
}

export interface CaseStudy {
  slug: string;
  brand: string;
  industry: string;
  location: string | null;
  overview: string;
  channels: string[];
  campaigns: CaseStudyCampaign[];
  liveUrl: string | null;
  liveLabel: string | null;
  /** Brand logo (public/work/), shown in the hero when present. */
  logo?: { src: string; width: number; height: number };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "skyphonez",
    brand: "Skyphonez",
    industry: "Technology & E-commerce",
    location: "Australia",
    overview:
      "Skyphonez is an established company in Australia that sells smartphones and other tech gadgets. A leading technology company dedicated to providing innovative and high-quality mobile devices to tech-savvy consumers worldwide, with a commitment to excellence and a passion for cutting-edge technology, Skyphonez has established itself as a trusted brand in the mobile industry.",
    channels: ["Facebook Ads", "Google Ads", "GA4"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Driving Remarkable Sales Growth with Facebook Ads",
        challenge:
          "We faced the task of capturing the attention of potential customers, driving engagement, and ultimately converting that engagement into tangible sales.",
        achievement:
          "We saw exponential growth in sales, with a substantial increase in website traffic, high conversion rates, and positive return on ad spend (ROAS).",
        image: { src: "/work/skyphonez-facebook-ads.webp", width: 1582, height: 720 },
      },
      {
        channel: "GA4",
        period: "2024",
        headline: "Driving Impressive Sales Results with GA4 Ads",
        challenge:
          "We had to adapt to the new GA4 platform, optimize campaign tracking, and ensure seamless integration with Skyphonez website to accurately measure and attribute conversions.",
        achievement:
          "By leveraging advanced audience targeting, personalized ad creatives, and data-driven optimization techniques, we achieved significant growth in sales and revenue.",
        image: { src: "/work/skyphonez-ga4-2024.webp", width: 1278, height: 702 },
      },
      {
        channel: "GA4",
        period: "All Time",
        headline: "Driving Impressive Sales Results with GA4 Ads",
        challenge:
          "We had to adapt to the new GA4 platform, optimize campaign tracking, and ensure seamless integration with Skyphonez website to accurately measure and attribute conversions.",
        achievement:
          "By leveraging advanced audience targeting, personalized ad creatives, and data-driven optimization techniques, we achieved significant growth in sales and revenue.",
        image: { src: "/work/skyphonez-ga4-all-time.webp", width: 1283, height: 706 },
      },
      {
        channel: "Google Ads",
        period: "2024",
        headline: "Remarkable Sales Growth with Google Ads",
        challenge:
          "Our task was to create effective campaigns that would capture the attention of potential customers, drive quality traffic to Skyphonez website, and ultimately convert that traffic into profitable sales.",
        achievement:
          "We saw significant growth in website traffic, high conversion rates, and a positive return on ad spend (ROAS). Our tailored approach to keyword selection, ad placement, and bid management played a crucial role in driving customer acquisition and revenue growth for Skyphonez.",
        image: { src: "/work/skyphonez-google-ads-2024.webp", width: 1231, height: 448 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Exponential Sales Growth with Google Ads",
        challenge:
          "Our task was to create effective campaigns that would capture the attention of potential customers, raise brand awareness, drive quality traffic to the Skyphonez website, and ultimately convert that traffic into successful sales.",
        achievement:
          "Through meticulous campaign planning, comprehensive keyword research, compelling ad creatives, and continuous optimization, our Google Ads campaigns achieved exceptional success in generating sales for Skyphonez.",
        image: { src: "/work/skyphonez-google-ads-all-time.webp", width: 1263, height: 450 },
      },
      {
        channel: "Google Ads",
        period: "Last Month",
        headline: "Impressive Results and Growth in Last Month's Analytics",
        challenge:
          "During the last month, our Google Ads campaign for Skyphonez faced certain performance challenges that required strategic intervention. These challenges included increased competition, fluctuating market trends, and evolving consumer behavior.",
        achievement:
          "Through continuous monitoring, optimization, and data-driven strategies, we were able to overcome the obstacles and achieve significant improvements in key performance metrics. This included increased CTR, enhanced conversion rates, improved ROAS.",
        image: { src: "/work/skyphonez-google-ads-last-month.webp", width: 992, height: 328 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Remarkable and Sustained Sales Growth in All-Time Analytics",
        challenge:
          "Throughout our partnership in running Google Ads for Skyphonez to generate sales, we encountered various long-term challenges that required strategic solutions.",
        achievement:
          "Through continuous optimization, data analysis, and strategic adjustments, we achieved impressive results in key performance indicators. This included consistently high CTR, improved conversion rates, exceptional return on ad spend (ROAS), and substantial cumulative sales for Skyphonez.",
        image: { src: "/work/skyphonez-google-ads-all-time-long-term.webp", width: 992, height: 328 },
      },
    ],
    liveUrl: null,
    liveLabel: null,
    logo: { src: "/work/skyphonez-logo.webp", width: 225, height: 225 },
  },
  {
    slug: "technoor",
    brand: "Technoor.me",
    industry: "Technology & E-commerce",
    location: "GCC",
    overview:
      "Technoor.me is a leading online platform dedicated to providing a wide range of new mobile phones and innovative technology products in the GCC (Gulf Cooperation Council) region. Its mission is to offer a seamless and convenient shopping experience for individuals seeking the latest mobile phones and cutting-edge technology products in the GCC region, curating a diverse selection of premium brands and models so customers have access to the most sought-after devices and accessories.",
    channels: ["Facebook Ads", "Google Ads"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Successful Sales Generation through Facebook Ads",
        challenge:
          "One of the main challenges we faced while running Facebook ads for Technoor to generate sales was targeting the right audience. With a wide range of products or services offered by Technoor, it was essential to identify and reach the most relevant audience who would be genuinely interested in their offerings.",
        achievement:
          "By meticulously analyzing data, optimizing targeting parameters, and refining ad creatives, we were able to reach a highly engaged audience who demonstrated a genuine interest in Technoor's products.",
        image: { src: "/work/technoor-facebook-ads.webp", width: 1547, height: 828 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Remarkable Sales Generation through Strategic Google Ads Campaign",
        challenge:
          "One of the main challenges we encountered while running a Google Ads campaign for Technoor to generate sales was optimizing the campaign for a competitive market.",
        achievement:
          "Despite the challenges, our Google Ads campaign for Technoor yielded remarkable achievements in terms of generating sales. By implementing a comprehensive keyword research strategy, optimizing ad copy and landing pages, and constantly monitoring performance, we were able to drive a significant increase in website traffic and conversions.",
        image: { src: "/work/technoor-google-ads.webp", width: 1493, height: 464 },
      },
    ],
    liveUrl: "https://technoor.me",
    liveLabel: "technoor.me",
    logo: { src: "/work/technoor-logo.webp", width: 225, height: 225 },
  },
  {
    slug: "vitastrong",
    brand: "Vitastrong",
    industry: "Health & Wellbeing",
    location: null,
    overview:
      "Vitastrong is a health and wellness company dedicated to empowering individuals to live vibrant and fulfilling lives. Its mission is to inspire and support individuals in achieving their health goals, with a range of premium supplements formulated with carefully selected ingredients backed by scientific research.",
    channels: ["Facebook Ads", "Google Ads", "GA4"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "Last Month",
        headline: "Successful Lead Generation and Conversion in Vitastrong's Facebook Ads",
        challenge:
          "The primary challenge we faced in last month's Facebook ads campaign for Vitastrong was maximizing lead generation. With the goal of capturing valuable leads for Vitastrong's products or services, we encountered obstacles such as intense competition and capturing the attention of a highly targeted audience.",
        achievement:
          "Despite the challenges, our Facebook ads campaign for Vitastrong last month achieved remarkable success in lead generation and conversion. By implementing a data-driven approach, conducting thorough audience research, and leveraging persuasive ad formats, we were able to attract qualified leads.",
        image: { src: "/work/vitastrong-facebook-leads-last-month.webp", width: 1582, height: 812 },
      },
      {
        channel: "Facebook Ads",
        period: "This Month",
        headline: "Impressive Lead Generation and Conversion Rate in Vitastrong's Facebook Ads Campaign This Month",
        challenge:
          "In this month's Facebook ads campaign for Vitastrong, our main challenge was optimizing lead generation and conversion. We aimed to attract a highly targeted audience and convert them into qualified leads for Vitastrong's offerings.",
        achievement:
          "Despite the challenges faced, our Facebook ads campaign for Vitastrong this month achieved impressive lead generation and a high conversion rate. By employing advanced targeting techniques, delivering tailored ad messaging, and optimizing lead capture strategies, we successfully attracted a significant number of qualified leads.",
        image: { src: "/work/vitastrong-facebook-leads-this-month.webp", width: 1560, height: 815 },
      },
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Consistent Lead Generation Success and Growth in Vitastrong's All-Time Facebook Ads Campaigns",
        challenge:
          "Throughout Vitastrong's all-time Facebook ads campaigns, a persistent challenge has been sustaining effective lead generation. As the campaigns progressed over time, we faced obstacles such as audience saturation, increased competition, and evolving market dynamics.",
        achievement:
          "The all-time Facebook ads campaigns for Vitastrong have achieved remarkable success in lead generation, resulting in consistent growth. By implementing a comprehensive strategy that included precise audience targeting, compelling ad messaging, and seamless lead capture mechanisms, we were able to generate a consistent stream of qualified leads.",
        image: { src: "/work/vitastrong-facebook-leads-all-time.webp", width: 1576, height: 820 },
      },
      {
        channel: "Facebook Ads",
        period: "Last Month",
        headline: "Successful Sales Generation through Facebook Ads Campaign for Vitastrong in the Last Month",
        challenge:
          "In the last month's Facebook ads campaign for Vitastrong, one of the main challenges we faced was targeting the right audience. Vitastrong offers a range of health and wellness products, and identifying the most relevant audience was crucial for driving sales.",
        achievement:
          "Despite the challenges, our Facebook ads campaign for Vitastrong in the last month achieved remarkable success in generating sales. By implementing a strategic approach, optimizing ad creatives, and leveraging audience insights, we were able to drive significant engagement and conversions.",
        image: { src: "/work/vitastrong-facebook-sales-last-month.webp", width: 1579, height: 811 },
      },
      {
        channel: "Facebook Ads",
        period: "This Month",
        headline: "Impressive Sales Growth and Conversion Rate in Vitastrong's Facebook Ads Campaign This Month",
        challenge:
          "In this month's Facebook ads campaign for Vitastrong, our main challenge was to maximize return on investment (ROI) and conversions. As the campaign progressed, we encountered obstacles such as rising advertising costs and increased competition in the market.",
        achievement:
          "Despite the challenges faced, our Facebook ads campaign for Vitastrong this month achieved impressive sales growth and a high conversion rate. By implementing a data-driven approach and employing advanced targeting techniques, we were able to reach a highly engaged audience who demonstrated a genuine interest in Vitastrong's products.",
        image: { src: "/work/vitastrong-facebook-sales-this-month.webp", width: 1573, height: 823 },
      },
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Long-Term Success and Revenue Growth in Vitastrong's All-Time Facebook Ads",
        challenge:
          "Throughout Vitastrong's all-time Facebook ads campaigns, a persistent challenge has been consistently driving sales and sustaining performance. Maintaining a high level of engagement and conversions over an extended period requires ongoing optimization and adaptation to changes in the market and audience behavior.",
        achievement:
          "The all-time Facebook ads campaigns for Vitastrong have achieved substantial long-term success and revenue growth. By implementing a comprehensive strategy that included thorough audience research, creative ad targeting, and continuous optimization, we were able to generate consistent sales and maintain a strong performance.",
        image: { src: "/work/vitastrong-facebook-sales-all-time.webp", width: 1581, height: 806 },
      },
      {
        channel: "GA4",
        period: "2024",
        headline: "Remarkable Sales Growth and Conversion Rate in Vitastrong's GA4 Campaigns",
        challenge:
          "The main challenge we faced in 2024 while running GA4 campaigns for Vitastrong was optimizing them for sales generation. The transition to GA4 brought new features and measurement capabilities, but it also posed challenges in terms of understanding and adapting to the updated platform.",
        achievement:
          "Despite the challenges, our GA4 campaigns for Vitastrong in 2024 achieved remarkable success in terms of sales growth and conversion rate. By leveraging the enhanced tracking and measurement capabilities of GA4, we gained valuable insights into user behavior and made data-driven decisions to optimize the campaigns.",
        image: { src: "/work/vitastrong-ga4-2024.webp", width: 1362, height: 727 },
      },
      {
        channel: "GA4",
        period: "All Time",
        headline: "Consistent Sales Growth and Conversion Success in Vitastrong's All-Time GA4 Campaigns",
        challenge:
          "Throughout Vitastrong's all-time GA4 campaigns, our main challenge was maximizing sales generation. The transition to GA4 brought new opportunities and complexities, requiring us to navigate through the platform's features, adapt to changes in tracking and measurement, and optimize campaigns accordingly.",
        achievement:
          "The all-time GA4 campaigns for Vitastrong have achieved consistent and impressive sales growth, showcasing conversion success. By leveraging the advanced tracking and measurement capabilities of GA4, we gained valuable insights into user behavior, enabling us to optimize campaigns for maximum impact.",
        image: { src: "/work/vitastrong-ga4-all-time.webp", width: 1353, height: 733 },
      },
      {
        channel: "Google Ads",
        period: "2024",
        headline: "Significant Sales Growth and Conversion Rate in Vitastrong's 2024 Google Ads",
        challenge:
          "One of the main challenges we encountered in the 2024 Google Ads campaigns for Vitastrong was maximizing sales generation. We faced hurdles such as increased competition, rising advertising costs, and capturing the attention of potential customers in a highly saturated digital marketplace.",
        achievement:
          "Despite the challenges faced, our 2024 Google Ads campaigns for Vitastrong achieved significant sales growth and a high conversion rate. By implementing a data-driven approach, utilizing advanced targeting options, and continuously optimizing ad performance, we successfully attracted a substantial number of qualified customers.",
        image: { src: "/work/vitastrong-google-ads-2024.webp", width: 1483, height: 664 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Consistent Sales Growth and Conversion Success in Vitastrong's All-Time Google Ads Campaigns",
        challenge:
          "Throughout Vitastrong's all-time Google Ads campaigns, our main challenge was maximizing sales generation. We faced obstacles such as intense competition, evolving consumer behavior, and maintaining cost-effectiveness in advertising spend.",
        achievement:
          "The all-time Google Ads campaigns for Vitastrong have achieved consistent sales growth and conversion success. By implementing a comprehensive strategy that included effective keyword targeting, compelling ad creatives, and optimized landing pages, we were able to generate a steady stream of high-quality traffic.",
        image: { src: "/work/vitastrong-google-ads-all-time.webp", width: 1469, height: 678 },
      },
      {
        channel: "Google Ads",
        period: "2024",
        headline: "Impressive Sales Growth and Conversion Rate in Vitastrong's 2024 Google Ads Campaigns Overview",
        challenge:
          "The main challenge we faced in the 2024 Google Ads campaigns overview for Vitastrong was maximizing sales generation. Our objective was to effectively generate sales by attracting a highly targeted audience and converting them into customers.",
        achievement:
          "Despite the challenges, our 2024 Google Ads campaigns for Vitastrong achieved impressive sales growth and a high conversion rate in the overview. By implementing a data-driven approach, and leveraging advanced targeting options, we successfully attracted a significant number of qualified customers.",
        image: { src: "/work/vitastrong-google-ads-overview-2024.webp", width: 1495, height: 327 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Consistent Sales Growth and Conversion Success in Vitastrong's All-Time Google Ads Campaigns Overview",
        challenge:
          "Throughout Vitastrong's all-time Google Ads campaigns overview, our main challenge was maximizing sales generation. We encountered hurdles such as increasing competition, evolving market dynamics, and the need to maintain cost-effectiveness in advertising spend.",
        achievement:
          "The all-time Google Ads campaigns overview for Vitastrong has achieved consistent sales growth and conversion success. By implementing a comprehensive strategy that included effective keyword targeting, compelling ad creatives, and optimized landing pages, we consistently generated high-quality traffic.",
        image: { src: "/work/vitastrong-google-ads-overview-all-time.webp", width: 1495, height: 327 },
      },
    ],
    liveUrl: null,
    liveLabel: null,
    logo: { src: "/work/vitastrong-logo.webp", width: 225, height: 225 },
  },
  {
    slug: "wise-market-australia",
    brand: "Wise Market Australia",
    industry: "Technology & E-commerce",
    location: "Australia",
    overview:
      "Wise Market Australia is a leading online platform dedicated to empowering consumers with the knowledge and resources they need to make smart shopping choices. With a mission to revolutionize the way Australians shop, it aims to provide a comprehensive and unbiased marketplace where consumers can find reliable information, compare products and prices, and make well-informed purchasing decisions, offering a user-friendly interface, expert reviews, and valuable insights.",
    channels: ["Facebook Ads", "Google Ads"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Remarkable Sales Growth and Conversion Success in Wise Market Australia's All-Time Facebook Ads Campaigns",
        challenge:
          "Throughout Wise Market Australia's FB Ads campaigns, the main challenge was maximizing sales generation. The digital advertising landscape is highly competitive, and capturing the attention of potential customers amidst the noise posed a continuous challenge.",
        achievement:
          "The FB Ads campaigns for Wise Market Australia have achieved remarkable success in terms of sales growth and conversion rate. By implementing a comprehensive strategy that included precise audience targeting, compelling ad messaging, and seamless conversion funnels, we were able to generate a consistent stream of qualified leads.",
        image: { src: "/work/wise-market-australia-facebook-ads.webp", width: 1600, height: 825 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Consistent Conversion Growth and Success in Wise Market Australia's All-Time Google Ads Campaigns",
        challenge:
          "The primary challenge faced in Wise Market Australia's all-time Google Ads campaigns was maximizing conversions. The digital advertising landscape is highly competitive, and driving meaningful conversions requires strategic planning, precise targeting, and persuasive ad messaging.",
        achievement:
          "The all-time Google Ads campaigns for Wise Market Australia have achieved consistent conversion growth and remarkable success. By implementing a comprehensive strategy that included meticulous keyword research, compelling ad copy, and optimized landing pages, we consistently attracted and converted high-quality leads.",
        image: { src: "/work/wise-market-australia-google-ads-all-time.webp", width: 1371, height: 717 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Consistent Conversion Growth and Success in Wise Market Australia's All-Time Google Ads Campaigns Overview",
        challenge:
          "Throughout Wise Market Australia's all-time Google Ads campaigns overview, the main challenge was maximizing conversions. The digital advertising landscape is highly competitive, and driving meaningful conversions requires strategic planning, precise targeting, and persuasive ad messaging.",
        achievement:
          "The all-time Google Ads campaigns overview for Wise Market Australia have achieved consistent conversion growth and remarkable success. By implementing a comprehensive strategy that included meticulous keyword research, compelling ad copy, and optimized landing pages, we consistently attracted and converted high-quality leads.",
        image: { src: "/work/wise-market-australia-google-ads-overview-all-time.webp", width: 992, height: 328 },
      },
      {
        channel: "Google Ads",
        period: "Last Month",
        headline: "Impressive Conversion Growth and Success in Wise Market Australia's Last Month Google Ads Campaigns Overview",
        challenge:
          "The main challenge we faced in Wise Market Australia's last month Google Ads campaigns overview was maximizing conversions. Intense competition, evolving market dynamics, and the need to optimize ad targeting and messaging posed continuous hurdles.",
        achievement:
          "In Wise Market Australia's last month Google Ads campaigns overview, we achieved impressive conversion growth and success. Through meticulous keyword research, compelling ad copy, and optimized landing pages, we attracted and converted high-quality leads.",
        image: { src: "/work/wise-market-australia-google-ads-last-month.webp", width: 992, height: 328 },
      },
    ],
    liveUrl: null,
    liveLabel: null,
    logo: { src: "/work/wise-market-australia-logo.webp", width: 225, height: 225 },
  },
  {
    slug: "wise-market-pakistan",
    brand: "Wise Market Pakistan",
    industry: "Technology & E-commerce",
    location: "Pakistan",
    overview:
      "Wise Market Pakistan is a leading e-commerce platform dedicated to revolutionizing the online shopping experience in Pakistan. Its mission is to connect buyers and sellers in a seamless and transparent manner, offering a wide range of products and services to cater to diverse consumer demands, and to create a vibrant online marketplace that fosters growth opportunities for small businesses and entrepreneurs across the country.",
    channels: ["Facebook Ads", "Google Ads", "GA4"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "2023–2024",
        headline: "Significant Sales Growth and Conversion Success in Wise Market Pakistan's First Ad Account of FB Ads Campaign",
        challenge:
          "The main challenge we encountered in Wise Market Pakistan's first ad account of 2023 and 2024 Facebook Ads campaign was maximizing sales generation. Overcoming obstacles such as intense competition, evolving consumer behavior, and optimizing ad targeting and messaging posed continuous challenges.",
        achievement:
          "In Wise Market Pakistan's first ad account of 2023 and 2024 Facebook Ads campaign, we achieved significant sales growth and conversion success. By implementing a comprehensive strategy that included precise audience targeting, compelling ad creatives, and optimized landing pages, we generated a steady stream of high-quality traffic and conversions.",
        image: { src: "/work/wise-market-pakistan-facebook-ads-1st-account.webp", width: 1588, height: 825 },
      },
      {
        channel: "Facebook Ads",
        period: "2023–2024",
        headline: "Significant Sales Growth and Conversion Success in Wise Market Pakistan's Second Ad Account of FB Ads Campaign",
        challenge:
          "The main challenge we encountered in Wise Market Pakistan's second ad account of 2023 and 2024 Facebook Ads campaign was maximizing sales generation. Overcoming obstacles such as intense competition, evolving consumer behavior, and optimizing ad targeting and messaging posed continuous challenges.",
        achievement:
          "In Wise Market Pakistan's second ad account of 2023 and 2024 Facebook Ads campaign, we achieved significant sales growth and conversion success. By implementing a comprehensive strategy that included precise audience targeting, compelling ad creatives, and optimized landing pages, we generated a steady stream of high-quality traffic and conversions.",
        image: { src: "/work/wise-market-pakistan-facebook-ads-2nd-account.webp", width: 1585, height: 804 },
      },
      {
        channel: "Facebook Ads",
        period: "2023–2024",
        headline: "Significant Sales Growth and Conversion Success in Wise Market Pakistan's Third Ad Account of FB Ads Campaign",
        challenge:
          "The main challenge we encountered in Wise Market Pakistan's third ad account of 2023 and 2024 Facebook Ads campaign was maximizing sales generation. Overcoming obstacles such as intense competition, evolving consumer behavior, and optimizing ad targeting and messaging posed continuous challenges.",
        achievement:
          "In Wise Market Pakistan's third ad account of 2023 and 2024 Facebook Ads campaign, we achieved significant sales growth and conversion success. By implementing a comprehensive strategy that included precise audience targeting, compelling ad creatives, and optimized landing pages, we generated a steady stream of high-quality traffic and conversions.",
        image: { src: "/work/wise-market-pakistan-facebook-ads-3rd-account.webp", width: 1590, height: 830 },
      },
      {
        channel: "Facebook Ads",
        period: "2023–2024",
        headline: "Significant Sales Growth and Conversion Success in Wise Market Pakistan's Fourth Ad Account of FB Ads Campaign",
        challenge:
          "The main challenge we encountered in Wise Market Pakistan's fourth ad account of 2023 and 2024 Facebook Ads campaign was maximizing sales generation. Overcoming obstacles such as intense competition, evolving consumer behavior, and optimizing ad targeting and messaging posed continuous challenges.",
        achievement:
          "In Wise Market Pakistan's fourth ad account of 2023 and 2024 Facebook Ads campaign, we achieved significant sales growth and conversion success. By implementing a comprehensive strategy that included precise audience targeting, compelling ad creatives, and optimized landing pages, we generated a steady stream of high-quality traffic and conversions.",
        image: { src: "/work/wise-market-pakistan-facebook-ads-4th-account.webp", width: 1581, height: 496 },
      },
      {
        channel: "GA4",
        period: "2024",
        headline: "Exponential Sales Growth and Conversion Success in Wise Market Pakistan's 2024 GA4 Campaign Overview",
        challenge:
          "The primary challenge faced in Wise Market Pakistan's 2024 GA4 campaign overview was maximizing sales generation. Overcoming obstacles such as intense competition, evolving market dynamics, and optimizing ad targeting and messaging posed continuous hurdles.",
        achievement:
          "In Wise Market Pakistan's 2024 GA4 campaign overview, we achieved exponential sales growth and conversion success. Through meticulous audience segmentation, personalized ad experiences, and continuous optimization, we attracted and converted high-quality leads.",
        image: { src: "/work/wise-market-pakistan-ga4-2024.webp", width: 1334, height: 493 },
      },
      {
        channel: "GA4",
        period: "2023–2024",
        headline: "Exponential Sales Growth and Conversion Success in Wise Market Pakistan's GA4 Campaigns Overview (2023 and 2024)",
        challenge:
          "The main challenge faced in Wise Market Pakistan's GA4 campaigns overview for 2023 and 2024 was maximizing sales generation. Overcoming obstacles such as intense competition, evolving market dynamics, and optimizing ad targeting and messaging posed continuous hurdles.",
        achievement:
          "In Wise Market Pakistan's GA4 campaigns overview for 2023 and 2024, we achieved remarkable sales growth and conversion success. Through meticulous audience segmentation, personalized ad experiences, and continuous optimization, we attracted and converted high-quality leads.",
        image: { src: "/work/wise-market-pakistan-ga4-2023-2024.webp", width: 1330, height: 776 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Significant Sales Growth and Conversion Success in Wise Market Pakistan's Google Ads Campaign",
        challenge:
          "The main challenge faced in Wise Market Pakistan's Google Ads campaign was maximizing sales generation. Overcoming obstacles such as intense competition, optimizing ad targeting and messaging, and staying within budget posed continuous hurdles.",
        achievement:
          "In Wise Market Pakistan's Google Ads campaign, we achieved significant sales growth and conversion success. Through meticulous keyword research, targeted ad placements, and continuous optimization, we attracted high-quality traffic and converted leads into customers.",
        image: { src: "/work/wise-market-pakistan-google-ads-all-time.webp", width: 1441, height: 718 },
      },
      {
        channel: "Google Ads",
        period: "All Time",
        headline: "Impressive Cost-to-Revenue Ratio and Revenue Growth in Wise Market Pakistan's Google Ads Campaign Overview",
        challenge:
          "The primary challenge faced in Wise Market Pakistan's Google Ads campaign overview was maximizing sales generation while optimizing costs. Balancing the cost-per-click (CPC) and return on ad spend (ROAS), along with intense competition and evolving market dynamics, posed continuous hurdles.",
        achievement:
          "In Wise Market Pakistan's Google Ads campaign overview, we achieved an impressive cost-to-revenue ratio and significant revenue growth. Through meticulous budget management, strategic bidding strategies, and continuous optimization, we maximized sales while maintaining an efficient cost structure.",
        image: { src: "/work/wise-market-pakistan-google-ads-cost-revenue.webp", width: 1495, height: 327 },
      },
    ],
    liveUrl: "https://wisemarket.com.pk",
    liveLabel: "wisemarket.com.pk",
    logo: { src: "/work/wise-market-pakistan-logo.webp", width: 318, height: 159 },
  },
  {
    slug: "mawa-group",
    brand: "Mawa Group",
    industry: "Real Estate & Development",
    location: "Pakistan",
    overview:
      "Mawa Group Real Estate and Developers is a renowned and trusted name in the real estate industry, committed to delivering exceptional properties and creating sustainable communities. Its mission is to redefine the concept of modern living by developing residential and commercial spaces that inspire and elevate lifestyles, creating architectural marvels that blend contemporary design with functional spaces, ensuring the highest standards of construction and craftsmanship.",
    channels: ["Facebook Ads"],
    campaigns: [
      {
        channel: "Facebook Ads",
        period: "All Time",
        headline: "Exemplary Lead Generation Success and Conversion Rates in Mawa Group Real Estate and Developers' FB Ads",
        challenge:
          "The primary challenge faced in Mawa Group Real Estate and Developers' Facebook Ads campaigns was generating high-quality leads. Overcoming obstacles such as fierce competition, reaching the right target audience, and capturing their attention posed continuous hurdles.",
        achievement:
          "In Mawa Group Real Estate and Developers' Facebook Ads campaigns, we achieved exemplary lead generation success and impressive conversion rates. Through meticulous audience segmentation, personalized ad experiences, and continuous optimization, we attracted and converted high-quality leads.",
        image: { src: "/work/mawa-group-facebook-ads.webp", width: 1024, height: 450 },
      },
    ],
    liveUrl: "https://mawagroups.com",
    liveLabel: "mawagroups.com",
    logo: { src: "/work/mawa-group-logo.webp", width: 225, height: 225 },
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
