
# OpenAI Integration for ImpactWon Right-to-Win Assessment

## Overview

The ImpactWon Right-to-Win Deal Check app uses OpenAI's GPT-4o model to generate AI-powered insights based on your assessment results. This integration provides personalized recommendations following the CEO-Led Sales 4C methodology.

## How It Works

### 1. Assessment Flow
- Complete the deal details and 4C assessments (Credibility, Capability, Commitment, Control)
- View your results on the Results screen
- Click "Generate AI Insights" to get personalized recommendations

### 2. AI Analysis
The system sends your assessment data to OpenAI's GPT-4o model, which analyzes:
- Your deal information (client, value, stage, context)
- All 4C scores (Credibility, Capability, Commitment, Control)
- The overall Right-to-Win score

### 3. Insights Structure
The AI generates a comprehensive analysis including:
- **Executive Summary**: Quick overview of your RTW position
- **Strengths & Weaknesses**: Detailed analysis of each C
- **Critical Focus Area**: The most important area needing attention
- **Recommended Actions**: 4-5 specific, actionable next steps
- **Risk Assessment**: Key risks and red flags

## Technical Implementation

### Edge Function
The integration uses a Supabase Edge Function (`generate-rtw-insights`) that:
- Validates the input data
- Constructs a detailed prompt based on ImpactWon methodology
- Calls OpenAI's Chat Completions API
- Returns structured insights

### Data Storage
After generating insights, the system automatically saves:
- Deal information to the `deals` table
- Assessment details to the `rtw_assessments` table
- AI insights are stored with the assessment for future reference

### Security
- All API calls are authenticated through Supabase
- OpenAI API key is stored securely as an environment variable
- Row Level Security (RLS) policies protect your data

## API Configuration

### Required Environment Variable
The Edge Function requires the `OPENAI_API_KEY` environment variable to be set in your Supabase project.

To set this up:
1. Go to your Supabase project dashboard
2. Navigate to Edge Functions → Secrets
3. Add `OPENAI_API_KEY` with your OpenAI API key

### OpenAI Model
- **Model**: GPT-4o (latest and most capable)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 800 (comprehensive insights)

## Error Handling

The system handles various error scenarios:
- **No API Key**: Shows configuration error
- **Network Issues**: Displays connection error with retry option
- **Invalid Data**: Validates input before sending to OpenAI
- **API Failures**: Provides user-friendly error messages

## Cost Considerations

OpenAI API usage is charged per token:
- Each insight generation uses approximately 1,000-1,500 tokens
- GPT-4o pricing: ~$0.01-0.02 per insight generation
- Monitor usage in your OpenAI dashboard

## Best Practices

### For Best Results
1. **Complete Deal Context**: Provide detailed information in the deal context field
2. **Accurate Scoring**: Be honest with your 4C assessments
3. **Review Insights**: Use AI recommendations as guidance, not absolute rules
4. **Iterate**: Run multiple assessments as deals progress

### Data Privacy
- Deal information is sent to OpenAI for analysis
- OpenAI does not use API data for model training (as per their policy)
- All data is stored securely in your Supabase database
- Consider data sensitivity when entering deal details

## Troubleshooting

### "Failed to generate insights"
- Check your internet connection
- Verify OPENAI_API_KEY is set in Supabase
- Check OpenAI API status at status.openai.com

### "OpenAI API key not configured"
- The OPENAI_API_KEY environment variable is missing
- Add it in Supabase Edge Functions → Secrets

### Slow Response Times
- OpenAI API typically responds in 3-10 seconds
- Complex analyses may take longer
- Check your OpenAI account rate limits

## Future Enhancements

Potential improvements:
- Historical insights comparison
- Trend analysis across multiple assessments
- Custom insight templates
- Export insights to PDF
- Integration with CRM systems

## Support

For issues or questions:
- Check Supabase Edge Function logs
- Review OpenAI API documentation
- Contact ImpactWon support

---

**Note**: This integration requires an active OpenAI API account with available credits.
