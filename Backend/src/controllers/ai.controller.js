const aiservice = require('../services/ai.service');


module.exports.getresponse = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(prompt);
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const response = await aiservice(prompt);
        return res.status(200).json({ response });

    }
    catch (error) {
        console.error('Error generating response:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}