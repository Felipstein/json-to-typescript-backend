export interface TranspilerService {

  /**
   * Transpila o JSON passado pelo parâmetro em uma interface descrita em uma string.
   * @param json json para ser transpilado.
   */
  transpile(json: string): Promise<string>;

}
