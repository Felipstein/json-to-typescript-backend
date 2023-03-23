import { Configuration, OpenAIApi } from 'openai';

import { env } from '../../config/env.config';
import { TranspilerService } from '../transpiler.service';
import { transpilationPrompt, TranspilationType } from '../../types/Transpilations';

/**
 * Implementação do serviço de transpilação utilizando o chatGPT
 */
export class ChatGptTranspilerService implements TranspilerService {

  private readonly openAI: OpenAIApi;

  constructor() {
    const openAIKey = env.OPENAI_KEY;

    if(!openAIKey) {
      throw new Error('OPENAI_KEY not setted on ".env".');
    }

    const configuration = new Configuration({
      apiKey: openAIKey,
    });

    this.openAI = new OpenAIApi(configuration);
  }

  async transpile(json: string, transpilationType: TranspilationType = 'typescript_interface'): Promise<string> {

    console.log(`Transpiling json with ${transpilationType}...`);

    const result = await this.openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Convert JSON into ${transpilationPrompt[transpilationType] || transpilationPrompt.typescript_interface}: ${json}. Use "MeuJSON" as name. Don't send any explanations.`,
        },
      ],
    });

    console.log('Transpilation finished.');
    console.log('Checking result...');

    const choices = result.data.choices;

    if(!choices || choices.length === 0) {
      throw new Error('Não foi possível transpilar o JSON. Houve algum problema no processo, tente novamente mais tarde.');
    }

    const { message } = choices[0];

    if(!message) {
      throw new Error('Não foi possível transpilar o JSON. Houve algum problema no processo, tente novamente mais tarde.');
    }

    console.log(`Success transpilation with ${transpilationType}!`);

    return message.content;
  }

}
