import { TranspilationType } from '../types/Transpilations';

export interface TranspilerService {

  /**
   * Transpila o JSON passado pelo parâmetro em uma interface descrita em uma string.
   * @param json json para ser transpilado.
   * @param transpilationType tipo de transpilação.
   * @return json transpilado.
   */
  transpile(json: string, transpilationType: TranspilationType): Promise<string>;

}
