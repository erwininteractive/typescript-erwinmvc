export interface InitOptions {
    skipInstall?: boolean;
    withDatabase?: boolean;
    withCi?: boolean;
}
/**
 * Scaffold a new MVC application.
 */
export declare function initApp(dir: string, options?: InitOptions): Promise<void>;
