const aiservice = require('../services/ai.service');


module.exports.getresponse = async (req, res) => {
    try {
        const code = req.body.code;
        console.log(code);
        
        if (!code) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const response = await aiservice(code);
        return res.status(200).json({ response });

    }
    catch (error) {
        console.error('Error generating response:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}