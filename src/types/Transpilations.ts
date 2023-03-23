const transpilationsTypes = ['typescript_interface', 'javascript_class', 'java_class', 'java_interface', 'java_abstract_class', 'c#_class', 'xml'] as const;

export function isValidTranspilationType(transpilationTypeCheck: string): boolean {
  if(!transpilationTypeCheck) {
    return false;
  }

  return transpilationsTypes.includes(transpilationTypeCheck as TranspilationType);
}

export type TranspilationType = typeof transpilationsTypes[number];

export const transpilationPrompt: Record<TranspilationType, string> = {
  typescript_interface: 'TypeScript interfaces',
  javascript_class: 'JavaScript class',
  java_class: 'Java class',
  java_interface: 'Java interface',
  java_abstract_class: 'Java abstract class',
  'c#_class': 'C# class',
  xml: 'XML',
};
