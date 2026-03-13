with (import <nixpkgs> {}); let
  env = bundlerEnv {
    name = "Icey's Site";
    inherit ruby;
    gemfile = ./Gemfile;
    lockfile = ./Gemfile.lock;
    gemset = ./gemset.nix;
  };
  in
    stdenv.mkDerivation {
	name = "Icey's Site";
	buildInputs = [env ruby];
	
	shellHook = ''
	  exec ${env}/bin/jekyll serve --watch
	'';
    }
